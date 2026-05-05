import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/lib/models/UserModel";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "google") {
        try {
          await dbConnect();
          const existingUser = await UserModel.findOne({ email: user.email });

          if (!existingUser) {
            const newUser = new UserModel({
              email: user.email,
              name: user.name,
              image: user.image,
              static_id: account.providerAccountId, // Using providerAccountId as requested
            });
            await newUser.save();
          }
          return true;
        } catch (error) {
          console.error("Error saving user to DB", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }: any) {
      // If user object is provided (during sign in) or role is missing, fetch from DB
      if (user || !token.role) {
         try {
           await dbConnect();
           // use token.email if user is not present (subsequent calls)
           const emailToSearch = user?.email || token.email;
           if (emailToSearch) {
             const dbUser = await UserModel.findOne({ email: emailToSearch }).lean() as User | null;
             if (dbUser) {
               token.id = dbUser._id.toString();
               token.role = dbUser.role || 'user'; // Ensure fallback
             }
           }
         } catch (error) {
           console.error("Error fetching user for token", error);
         }
      }
      return token;
    },
    async session({ session, token }: any) {
        if (token) {
           session.user.id = token.id;
           session.user.role = token.role;
        }
        return session;
    },
  },
};

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/UserModel";

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
      if (user) {
         try {
           await dbConnect();
           const dbUser = await UserModel.findOne({ email: user.email });
           if (dbUser) {
             token.id = dbUser._id.toString();
             token.isAdmin = dbUser.isAdmin;
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
           session.user.isAdmin = token.isAdmin;
        }
        return session;
    },
  },
};

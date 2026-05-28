import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/lib/models/UserModel";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const conn = await dbConnect();
          if (!conn) {
            throw new Error("Database connection unavailable");
          }

          const user = await UserModel.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("User not found");
          }

          if (!user.password) {
            throw new Error("Please use Google to sign in");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }: any) {
      // Force allow sign-in when explicitly enabled (useful for dev/testing)
      if (process.env.FORCE_ALLOW_SIGNIN === 'true') {
        return true;
      }
      
      // Allow credentials provider to pass through
      if (!account || account.provider === "credentials") {
        return true;
      }

      if (account?.provider === "google") {
        try {
          const conn = await dbConnect();

          // If DB is not available in development, allow sign-in but skip persistence
          if (!conn) {
            console.warn('DB unavailable during sign-in (development) — allowing sign-in without persistence');
            return true;
          }

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
          // During development, don't block sign-in for transient DB errors
          if (process.env.NODE_ENV === 'development') return true;
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }: any) {
      // If user object is provided (during sign in) or role is missing, fetch from DB
      if (user || !token.role) {
         try {
           const conn = await dbConnect();
           // If DB not available, populate token from `user` object when present
           if (!conn) {
             if (user) {
               token.id = user.id || token.id;
               token.role = 'user';
             } else if (!token.role) {
               token.role = 'user';
             }
             return token;
           }

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

'use client'

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logUp, logOut } from "@/redux/slices/handleLog";

export default function SessionSync() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(logUp({
        userName: session.user.name || '',
        userEmail: session.user.email || '',
        userPassword: '' // We don't have the password from the session
      }));
    } else if (status === "unauthenticated") {
      dispatch(logOut());
    }
  }, [session, status, dispatch]);

  return null;
}

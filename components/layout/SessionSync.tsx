'use client'

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logUp, logOut } from "@/redux/slices/handleLog";

export default function SessionSync() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Global guard across StrictMode double mount
    if ((globalThis as any)._sessionSynced) return;
    (globalThis as any)._sessionSynced = true;
    if (status === "authenticated" && session?.user) {
      dispatch(logUp({
        userName: session.user.name || "",
        userEmail: session.user.email || "",
        userPassword: "",
      }));
    } else if (status === "unauthenticated") {
      dispatch(logOut());
    }
  }, [session, status, dispatch]);

  return null;
}

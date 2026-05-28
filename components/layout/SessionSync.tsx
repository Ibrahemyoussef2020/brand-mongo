'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/redux/store"
import { setAuthenticated } from "@/redux/slices/handleLog"

/**
 * SessionSync — Idempotent bridge between NextAuth and Redux.
 *
 * Purpose:
 *   Keeps Redux `isLogged` in sync with the NextAuth session status.
 *   This is needed because Redux thunks (cart, favorites) access auth
 *   state via `getState()` and cannot call React hooks.
 *
 * Loading state handling:
 *   When `status === "loading"`, we do NOT dispatch anything.
 *   This means Redux retains whatever `isLogged` value was rehydrated
 *   by redux-persist from the previous session. This is intentional:
 *
 *   - If user WAS logged in: redux-persist rehydrates `isLogged: true`.
 *     During the loading window, thunks can still proceed. Once NextAuth
 *     resolves to "authenticated", we dispatch `setAuthenticated(true)` —
 *     same value, no re-render, no flicker.
 *
 *   - If user WAS logged in but session expired: redux-persist rehydrates
 *     `isLogged: true` (stale). Thunks may attempt API calls, but the
 *     server's `getServerSession()` will return 401. Once NextAuth resolves
 *     to "unauthenticated", we dispatch `setAuthenticated(false)` to correct
 *     the stale value. Brief window of stale-true is acceptable because
 *     it prevents guest flicker for the common case (session still valid).
 *
 *   - If user was NOT logged in: redux-persist rehydrates `isLogged: false`.
 *     No dispatch needed until status resolves. Everything stays consistent.
 *
 * Idempotency:
 *   `setAuthenticated(true)` dispatched N times → `isLogged: true`.
 *   React StrictMode can double-mount freely. No guards needed.
 *
 * Why no globalThis / useRef guard:
 *   The effect is pure and idempotent. Running it twice produces the same
 *   state. Guards are unnecessary and would break logout (preventing the
 *   "unauthenticated" dispatch from ever firing after the first mount).
 */
export default function SessionSync() {
  const { status } = useSession()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(setAuthenticated(true))
    } else if (status === "unauthenticated") {
      dispatch(setAuthenticated(false))
    }
    // status === "loading" → intentionally no dispatch.
    // Redux keeps the redux-persist rehydrated value until
    // NextAuth definitively resolves the session.
  }, [status, dispatch])

  return null
}

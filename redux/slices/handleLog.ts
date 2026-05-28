import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * Minimal auth state — a derived cache of NextAuth session status.
 *
 * This slice does NOT hold user identity data (name, email, image).
 * All identity data comes from NextAuth's `useSession()` hook directly.
 *
 * `isLogged` is kept in Redux solely because cart/favorites thunks
 * need synchronous access to auth status via `getState()`, and thunks
 * cannot call React hooks.
 *
 * The value is kept in sync with NextAuth by the `SessionSync` component,
 * which dispatches `setAuthenticated()` idempotently on every status change.
 *
 * `isAuthReady` starts `false` and becomes `true` once the first definitive
 * status ("authenticated" or "unauthenticated") is received from NextAuth.
 * This prevents thunks from seeing a stale redux-persist value as definitive
 * before the real session has been resolved.
 */

interface AuthState {
  isLogged: boolean
  isAuthReady: boolean
  isSubscriber: boolean
}

const initialState: AuthState = {
  isLogged: false,
  isAuthReady: false,
  isSubscriber: false,
}

const authSlice = createSlice({
  name: 'LogSlice',          // keep the same slice name so redux-persist key doesn't break
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload
      state.isAuthReady = true
    },
    setSubscriberStatus: (state, action: PayloadAction<boolean>) => {
      state.isSubscriber = action.payload
    },
  },
})

export const { setAuthenticated, setSubscriberStatus } = authSlice.actions
export default authSlice.reducer
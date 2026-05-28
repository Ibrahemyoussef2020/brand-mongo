'use client';

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Header from '@/components/layout/Header'

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push("/");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header page="login" heading="Sign In" />
      <div className="container">
        <div className="form-container" style={{ marginTop: 20 }}>
          <h1>Sign In</h1>
          <p className="desc">Sign in to your account</p>

          {error && (
            <div className="status-msg error">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={isLoading} className="submit-btn">
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="divider"><span>Or continue with</span></div>

          <button onClick={() => signIn('google', { callbackUrl: '/' })} className="oauth-btn">
            <FontAwesomeIcon icon={faGoogle} />
            Sign in with Google
          </button>

          <div style={{ marginTop: 16 }}>
            <p className="desc">Don't have an account? <Link href="/register">Register here</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}

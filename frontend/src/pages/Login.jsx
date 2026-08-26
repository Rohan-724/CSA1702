import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { Footer } from "./Landing";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Loader2 } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const res = await login(email, password);
    setSubmitting(false);
    if (res.ok) navigate("/chat");
    else setError(res.error);
  };

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="text-xs tracking-[0.25em] uppercase text-brand-muted mb-4">Welcome back</div>
          <h1 className="font-display text-4xl text-brand-forest mb-8" data-testid="login-title">
            Sign in to MediSense
          </h1>
          <form
            onSubmit={onSubmit}
            className="bg-white border border-stone-200 rounded-md p-8 space-y-5"
            data-testid="login-form"
          >
            <div>
              <Label htmlFor="email" className="text-sm text-brand-ink">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1.5"
                data-testid="login-email-input"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm text-brand-ink">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1.5"
                data-testid="login-password-input"
              />
            </div>
            {error && (
              <div className="text-sm text-brand-concerning" data-testid="login-error">
                {error}
              </div>
            )}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand-forest hover:bg-brand-forest/90 text-brand-cream h-11"
              data-testid="login-submit-btn"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign in"}
            </Button>
            <p className="text-sm text-brand-muted text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-brand-forest underline" data-testid="login-to-register">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

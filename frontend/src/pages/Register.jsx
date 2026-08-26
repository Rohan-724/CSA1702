import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { Footer } from "./Landing";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Loader2 } from "lucide-react";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const res = await register(email, password, name);
    setSubmitting(false);
    if (res.ok) navigate("/chat");
    else setError(res.error);
  };

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="text-xs tracking-[0.25em] uppercase text-brand-muted mb-4">Get started</div>
          <h1 className="font-display text-4xl text-brand-forest mb-8" data-testid="register-title">
            Create your account
          </h1>
          <form
            onSubmit={onSubmit}
            className="bg-white border border-stone-200 rounded-md p-8 space-y-5"
            data-testid="register-form"
          >
            <div>
              <Label htmlFor="name" className="text-sm text-brand-ink">Full name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1.5"
                data-testid="register-name-input"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm text-brand-ink">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1.5"
                data-testid="register-email-input"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm text-brand-ink">Password (min 6 chars)</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="mt-1.5"
                data-testid="register-password-input"
              />
            </div>
            {error && (
              <div className="text-sm text-brand-concerning" data-testid="register-error">
                {error}
              </div>
            )}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand-forest hover:bg-brand-forest/90 text-brand-cream h-11"
              data-testid="register-submit-btn"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create account"}
            </Button>
            <p className="text-sm text-brand-muted text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-brand-forest underline" data-testid="register-to-login">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

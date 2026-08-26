import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Stethoscope, LogOut } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav
      className="w-full bg-white border-b border-stone-200"
      data-testid="main-navbar"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" data-testid="brand-home-link">
          <div className="w-9 h-9 rounded-md bg-brand-forest flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-brand-cream" />
          </div>
          <div className="leading-tight">
            <div className="font-heading font-semibold text-brand-forest text-lg">MediSense</div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-brand-muted">
              Educational health assistant
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/chat"
                className="text-sm text-brand-ink hover:text-brand-forest transition-colors"
                data-testid="nav-chat-link"
              >
                Chat
              </Link>
              <span className="text-sm text-brand-muted hidden sm:inline" data-testid="nav-user-name">
                {user.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                data-testid="nav-logout-btn"
                className="border-stone-300"
              >
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-brand-ink hover:text-brand-forest transition-colors"
                data-testid="nav-login-link"
              >
                Login
              </Link>
              <Link to="/register" data-testid="nav-register-link">
                <Button size="sm" className="bg-brand-forest hover:bg-brand-forest/90 text-brand-cream">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

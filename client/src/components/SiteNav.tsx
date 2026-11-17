import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

/** Public navigation menu used on the homepage. */
export default function SiteNav() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav">
      <div className="site-nav-inner">
        <Logo />
        <nav className={`site-links ${open ? "open" : ""}`} aria-label="Site navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="site-nav-actions">
            {user ? (
              <Link to="/dashboard" className="primary-button">
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="secondary-button">
                  Log in
                </Link>
                <Link to="/signup" className="primary-button">
                  Sign up free
                </Link>
              </>
            )}
          </div>
        </nav>
        <button
          className="icon-button site-menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </header>
  );
}

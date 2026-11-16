import { Check } from "lucide-react";
import type { ReactNode } from "react";
import Logo from "../components/Logo";
import "../styles/public.css";

/** Two-column shell shared by the login and sign-up pages. */
export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="auth-page">
      <div className="auth-form-side">
        <Logo />
        <div className="auth-card">
          <div className="page-heading">
            <h1>{title}</h1>
            <span>{subtitle}</span>
          </div>
          {children}
          <p className="auth-footer">{footer}</p>
        </div>
      </div>
      <aside className="auth-aside" aria-hidden="true">
        <div className="auth-aside-inner">
          <h2>Shared expenses, minus the stress.</h2>
          <ul>
            <li>
              <Check size={15} /> Track bills across all your groups
            </li>
            <li>
              <Check size={15} /> Split equally, by amount or by percentage
            </li>
            <li>
              <Check size={15} /> Always know who owes whom
            </li>
          </ul>
        </div>
        <div className="orb orb-one" />
        <div className="orb orb-two" />
      </aside>
    </div>
  );
}

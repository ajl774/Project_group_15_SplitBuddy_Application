import { Split } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logo({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="logo" aria-label="SplitBuddy home">
      <span className="logo-mark">
        <Split size={20} strokeWidth={2.4} />
      </span>
      <span>
        Split<span>Buddy</span>
      </span>
    </Link>
  );
}

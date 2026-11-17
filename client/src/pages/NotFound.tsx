import { Link } from "react-router-dom";
import "../styles/public.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="page-heading">
        <p>404</p>
        <h1>Page not found</h1>
        <span>The page you’re looking for doesn’t exist.</span>
      </div>
      <Link to="/" className="primary-button">
        Back to home
      </Link>
    </div>
  );
}

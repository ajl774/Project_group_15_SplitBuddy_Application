import {
  ArrowRight,
  BarChart3,
  Check,
  CircleDollarSign,
  ReceiptText,
  Split,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import Logo from "../components/Logo";
import SiteNav from "../components/SiteNav";
import { money } from "../utils/format";
import "../styles/public.css";

const features = [
  {
    icon: Users,
    tone: "violet",
    title: "Groups for everything",
    copy: "Roommates, trips, weekend plans — keep every shared space organized in its own group.",
  },
  {
    icon: ReceiptText,
    tone: "blue",
    title: "Track every expense",
    copy: "Log who paid, what it was for and who was there. SplitBuddy keeps a clear history.",
  },
  {
    icon: Split,
    tone: "pink",
    title: "Split it your way",
    copy: "Divide bills equally, by exact amount or by percentage. We do the math for you.",
  },
  {
    icon: BarChart3,
    tone: "violet",
    title: "See where money goes",
    copy: "Reports break spending down by category and group so there are no surprises.",
  },
];

const steps = [
  ["Create a group", "Invite the people you share costs with."],
  ["Add expenses", "Log a bill the moment you pay it."],
  ["Settle up", "See exactly who owes whom and clear balances in one tap."],
];

const faqs = [
  ["Is SplitBuddy free?", "Yes — creating groups, adding expenses and splitting bills is free."],
  ["How many groups can I join?", "Each member can belong to up to five groups at a time."],
  ["Does SplitBuddy move money?", "No. SplitBuddy tracks balances; you settle up however you like."],
];

export default function Home() {
  return (
    <div className="public-page">
      <SiteNav />

      <section className="landing-hero">
        <div className="landing-copy">
          <span className="landing-pill">
            <CircleDollarSign size={14} /> Shared expenses, simplified
          </span>
          <h1>
            Split bills with friends, <span>without the awkward math.</span>
          </h1>
          <p>
            SplitBuddy keeps track of shared costs across your groups, shows who owes what, and
            makes settling up painless.
          </p>
          <div className="landing-cta">
            <Link to="/signup" className="primary-button">
              Get started free <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="secondary-button">
              I already have an account
            </Link>
          </div>
          <ul className="landing-checks">
            <li>
              <Check size={14} /> No credit card
            </li>
            <li>
              <Check size={14} /> Up to 5 groups
            </li>
            <li>
              <Check size={14} /> Works on mobile
            </li>
          </ul>
        </div>

        <div className="landing-preview" aria-hidden="true">
          <div className="balance-card preview-balance">
            <div className="balance-copy">
              <span className="balance-label">Your total balance</span>
              <strong>+{money(85.9)}</strong>
              <p>You’re owed across 3 groups</p>
            </div>
            <div className="orb orb-one" />
            <div className="orb orb-two" />
          </div>
          <div className="panel preview-people">
            {[
              ["Maya Chen", "MC", "purple", 68.2],
              ["Noah Williams", "NW", "blue", 42.5],
              ["Jamie Lee", "JL", "pink", -24.8],
            ].map(([name, initials, tone, amount]) => (
              <div className="person-row" key={name as string}>
                <Avatar initials={initials as string} tone={tone as string} />
                <div>
                  <strong>{name}</strong>
                  <span>{(amount as number) > 0 ? "owes you" : "you owe"}</span>
                </div>
                <strong className={(amount as number) > 0 ? "positive" : "negative"}>
                  {money(Math.abs(amount as number))}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="landing-section">
        <div className="section-intro">
          <p>Features</p>
          <h2>Everything you need to share costs fairly</h2>
        </div>
        <div className="feature-grid">
          {features.map(({ icon: Icon, tone, title, copy }) => (
            <article className="panel feature-card" key={title}>
              <span className={`group-icon ${tone}`}>
                <Icon size={20} />
              </span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="landing-section">
        <div className="section-intro">
          <p>How it works</p>
          <h2>Three steps to even</h2>
        </div>
        <ol className="steps-grid">
          {steps.map(([title, copy], index) => (
            <li className="panel step-card" key={title}>
              <span>{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="faq" className="landing-section">
        <div className="section-intro">
          <p>FAQ</p>
          <h2>Questions, answered</h2>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a]) => (
            <details className="panel" key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <div className="cta-banner">
          <h2>Ready to stop chasing receipts?</h2>
          <Link to="/signup" className="primary-button cta-light">
            Create your free account <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <Logo />
        <span>© {new Date().getFullYear()} SplitBuddy · Group 15</span>
      </footer>
    </div>
  );
}

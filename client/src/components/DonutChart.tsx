import { money } from "../utils/format";

export default function DonutChart({ total }: { total: number }) {
  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 160 160" role="img" aria-label="Expenses by category">
        <circle className="donut-track" cx="80" cy="80" r="60" />
        <circle className="donut-segment one" cx="80" cy="80" r="60" pathLength="100" />
        <circle className="donut-segment two" cx="80" cy="80" r="60" pathLength="100" />
        <circle className="donut-segment three" cx="80" cy="80" r="60" pathLength="100" />
      </svg>
      <div>
        <span>Total spent</span>
        <strong>{money(total)}</strong>
        <small>This month</small>
      </div>
    </div>
  );
}

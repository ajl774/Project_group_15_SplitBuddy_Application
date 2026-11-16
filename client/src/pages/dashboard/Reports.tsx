import { ArrowRight, CalendarDays, ChevronDown, TrendingUp } from "lucide-react";
import Avatar from "../../components/Avatar";
import PageTitle from "../../components/PageTitle";
import { money } from "../../utils/format";

const bars = [42, 64, 48, 88, 54, 73, 45, 67, 92, 61, 78, 56];

const groupRows = [
  ["Apartment 4B", "4 members", "8", "$214.65", "$82.40", "You are owed"],
  ["Weekend Crew", "5 members", "5", "$165.90", "$55.76", "You owe"],
  ["Lisbon Trip", "3 members", "2", "$47.50", "$24.50", "Settled"],
];

export default function Reports() {
  return (
    <>
      <div className="hero-row">
        <PageTitle
          eyebrow="Reports & analytics"
          title="Your report"
          copy="Understand your spending patterns and shared activity."
        />
        <button className="filter-button">
          <CalendarDays size={16} /> May 2026 <ChevronDown size={15} />
        </button>
      </div>
      <div className="report-stats">
        <div className="metric-card">
          <span>Total spent</span>
          <strong>{money(428.05)}</strong>
          <small className="positive">
            <TrendingUp size={13} /> 8.4% vs last month
          </small>
        </div>
        <div className="metric-card">
          <span>Your share</span>
          <strong>{money(162.66)}</strong>
          <small>38% of group expenses</small>
        </div>
        <div className="metric-card">
          <span>Top category</span>
          <strong>Food & dining</strong>
          <small>{money(214.03)} this month</small>
        </div>
      </div>
      <div className="report-grid">
        <section className="panel spending-chart">
          <div className="section-title">
            <div>
              <h2>Daily spending</h2>
              <p>Expenses throughout May</p>
            </div>
            <span className="chart-total">
              {money(428.05)} <small>total</small>
            </span>
          </div>
          <div className="bar-chart">
            <div className="grid-lines">
              <span>$120</span>
              <span>$80</span>
              <span>$40</span>
              <span>$0</span>
            </div>
            <div className="bars">
              {bars.map((height, index) => (
                <div key={index}>
                  <span
                    style={{ height: `${height}%` }}
                    className={index === 8 ? "highlight" : ""}
                  />
                  <small>{index % 2 === 0 ? index + 1 : ""}</small>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="panel insight-card">
          <span className="insight-icon">
            <TrendingUp size={22} />
          </span>
          <p>Monthly insight</p>
          <h2>You spent 12% less on shopping this month.</h2>
          <span>
            Nice work—your dining costs were a little higher, but overall shared spending stayed on
            track.
          </span>
          <button className="text-button">
            See full breakdown <ArrowRight size={15} />
          </button>
        </section>
      </div>
      <section className="panel group-report">
        <div className="section-title">
          <div>
            <h2>Spending by group</h2>
            <p>Where your shared money went</p>
          </div>
        </div>
        <div className="report-table">
          <div className="report-head">
            <span>Group</span>
            <span>Expenses</span>
            <span>Total spent</span>
            <span>Your share</span>
            <span>Status</span>
          </div>
          {groupRows.map((row, index) => (
            <div className="report-row" key={row[0]}>
              <span>
                <Avatar
                  initials={index === 0 ? "A4" : index === 1 ? "WC" : "LT"}
                  tone={index === 1 ? "blue" : index === 2 ? "pink" : "purple"}
                  small
                />
                <span>
                  <strong>{row[0]}</strong>
                  <small>{row[1]}</small>
                </span>
              </span>
              <span>{row[2]}</span>
              <strong>{row[3]}</strong>
              <span>{row[4]}</span>
              <span>
                <b className={`status status-${index}`}>{row[5]}</b>
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

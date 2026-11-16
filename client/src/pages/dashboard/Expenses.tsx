import { ChevronDown, Plus, ReceiptText, Search, TrendingUp, WalletCards } from "lucide-react";
import DonutChart from "../../components/DonutChart";
import ExpenseRow from "../../components/ExpenseRow";
import PageTitle from "../../components/PageTitle";
import { useDashboard } from "../../layouts/DashboardLayout";
import { money } from "../../utils/format";

export default function Expenses() {
  const { expenses, openAddExpense } = useDashboard();
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <>
      <div className="hero-row">
        <PageTitle
          eyebrow="Expense tracking"
          title="Your expenses"
          copy="A clear view of everything you’ve spent together."
        />
        <button className="primary-button" onClick={openAddExpense}>
          <Plus size={17} /> Add expense
        </button>
      </div>
      <div className="analytics-grid">
        <section className="panel chart-panel">
          <div className="section-title">
            <div>
              <h2>Spending overview</h2>
              <p>May 1 – May 27</p>
            </div>
            <button className="filter-button">
              This month <ChevronDown size={15} />
            </button>
          </div>
          <div className="chart-content">
            <DonutChart total={total} />
            <div className="category-list">
              {[
                ["Food & dining", "50%", "#7667f8"],
                ["Home & utilities", "30%", "#3186ee"],
                ["Shopping & other", "20%", "#b98cf4"],
              ].map(([label, value, color]) => (
                <div key={label}>
                  <span className="legend-dot" style={{ background: color }} />
                  <p>
                    <strong>{label}</strong>
                    <small>{value} of spending</small>
                  </p>
                  <b>{value}</b>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="panel stat-stack">
          <div className="quick-stat">
            <span className="group-icon violet">
              <ReceiptText size={20} />
            </span>
            <div>
              <p>Monthly total</p>
              <strong>{money(total)}</strong>
              <small>
                <TrendingUp size={13} /> 8.4% from April
              </small>
            </div>
          </div>
          <div className="quick-stat">
            <span className="group-icon blue">
              <WalletCards size={20} />
            </span>
            <div>
              <p>Your share</p>
              <strong>{money(total * 0.38)}</strong>
              <small>Across {expenses.length} expenses</small>
            </div>
          </div>
        </section>
      </div>
      <section className="panel all-expenses">
        <div className="section-title">
          <div>
            <h2>All expenses</h2>
            <p>{expenses.length} transactions this month</p>
          </div>
          <div className="table-tools">
            <label>
              <Search size={16} />
              <input aria-label="Search expenses" placeholder="Search expenses" />
            </label>
            <button className="filter-button">
              All groups <ChevronDown size={15} />
            </button>
          </div>
        </div>
        <div className="expense-list">
          {expenses.map((expense) => (
            <ExpenseRow expense={expense} key={expense.id} />
          ))}
        </div>
      </section>
    </>
  );
}

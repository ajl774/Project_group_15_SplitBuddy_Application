import type { Expense } from "../types";
import { categoryMeta } from "../utils/categories";
import { money } from "../utils/format";

export default function ExpenseRow({ expense }: { expense: Expense }) {
  const meta = categoryMeta[expense.category];
  const Icon = meta.icon;
  return (
    <div className="expense-row">
      <span className="category-icon" style={{ color: meta.color, background: meta.bg }}>
        <Icon size={18} />
      </span>
      <div className="expense-name">
        <strong>{expense.title}</strong>
        <span>
          {expense.group} · Paid by {expense.paidBy}
        </span>
      </div>
      <span className="expense-date">{expense.date}</span>
      <strong className="expense-amount">{money(expense.amount)}</strong>
    </div>
  );
}

import { X } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { Category, Expense } from "../types";

export default function AddExpenseModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (expense: Expense) => void;
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Food");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!title || !Number(amount)) return;
    onSave({
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      group: "Weekend Crew",
      paidBy: "You",
      date: "Today",
    });
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <form className="modal" onSubmit={submit} onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span>New shared expense</span>
            <h2>Add an expense</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <label className="field-label">
          Description
          <input
            autoFocus
            placeholder="What was it for?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="field-label">
          Amount
          <div className="amount-input">
            <span>$</span>
            <input
              placeholder="0.00"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </label>
        <label className="field-label">
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
            <option>Food</option>
            <option>Home</option>
            <option>Shopping</option>
            <option>Transport</option>
          </select>
        </label>
        <div className="modal-actions">
          <button type="button" className="secondary-button" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-button" type="submit">
            Add expense
          </button>
        </div>
      </form>
    </div>
  );
}

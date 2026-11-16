import { ArrowRight, Check, ChevronDown, CircleDollarSign, Users } from "lucide-react";
import { useState } from "react";
import Avatar from "../../components/Avatar";
import PageTitle from "../../components/PageTitle";
import { money } from "../../utils/format";

const attendees = [
  ["You", "ME", "purple"],
  ["Maya", "MC", "blue"],
  ["Noah", "NW", "pink"],
  ["Jamie", "JL", "green"],
] as const;

export default function SplitBill() {
  const [amount, setAmount] = useState("186.00");
  const [selected, setSelected] = useState<string[]>(["You", "Maya", "Noah"]);
  const [saved, setSaved] = useState(false);
  const amountNumber = Number(amount) || 0;
  const share = selected.length ? amountNumber / selected.length : 0;

  const toggle = (name: string) => {
    setSaved(false);
    setSelected((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    );
  };

  return (
    <>
      <PageTitle
        eyebrow="Bill splitting"
        title="Split a bill"
        copy="Add the details and we’ll do the math for everyone."
      />
      <div className="split-layout">
        <section className="panel split-form">
          <div className="step-label">
            <span>1</span>
            <div>
              <strong>Expense details</strong>
              <small>What are you splitting?</small>
            </div>
          </div>
          <label className="field-label">
            Description
            <input defaultValue="Dinner at Sora" />
          </label>
          <div className="two-fields">
            <label className="field-label">
              Total amount
              <div className="amount-input">
                <span>$</span>
                <input
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setSaved(false);
                  }}
                  inputMode="decimal"
                />
              </div>
            </label>
            <label className="field-label">
              Group
              <button className="select-input" type="button">
                <span>
                  <Users size={16} /> Weekend Crew
                </span>
                <ChevronDown size={16} />
              </button>
            </label>
          </div>
          <div className="divider" />
          <div className="step-label">
            <span>2</span>
            <div>
              <strong>Choose people</strong>
              <small>Select everyone who shared this expense</small>
            </div>
          </div>
          <div className="attendee-grid">
            {attendees.map(([name, initials, tone]) => {
              const isSelected = selected.includes(name);
              return (
                <button
                  className={`attendee ${isSelected ? "selected" : ""}`}
                  onClick={() => toggle(name)}
                  key={name}
                >
                  <Avatar initials={initials} tone={tone} />
                  <strong>{name}</strong>
                  <span className="check-circle">
                    {isSelected && <Check size={13} strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="divider" />
          <div className="step-label">
            <span>3</span>
            <div>
              <strong>Split method</strong>
              <small>How should this bill be divided?</small>
            </div>
          </div>
          <div className="method-tabs">
            <button className="active">Equally</button>
            <button>By amount</button>
            <button>By percentage</button>
          </div>
        </section>
        <aside className="panel summary-card">
          <div>
            <span className="summary-icon">
              <CircleDollarSign size={23} />
            </span>
            <h2>Split summary</h2>
            <p>Everyone pays an equal share.</p>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <strong>{money(amountNumber)}</strong>
          </div>
          <div className="split-people">
            {attendees
              .filter(([name]) => selected.includes(name))
              .map(([name, initials, tone]) => (
                <div key={name}>
                  <Avatar initials={initials} tone={tone} small />
                  <span>{name}</span>
                  <strong>{money(share)}</strong>
                </div>
              ))}
          </div>
          <button
            className={`primary-button full-button ${saved ? "saved" : ""}`}
            onClick={() => setSaved(true)}
            disabled={!selected.length}
          >
            {saved ? (
              <>
                <Check size={17} /> Expense added
              </>
            ) : (
              <>
                Split {money(amountNumber)} <ArrowRight size={17} />
              </>
            )}
          </button>
          <small className="summary-note">
            You paid this expense · {selected.length} people selected
          </small>
        </aside>
      </div>
    </>
  );
}

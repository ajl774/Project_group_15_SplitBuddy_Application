import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  House,
  Plus,
  ReceiptText,
  Users,
  WalletCards,
} from "lucide-react";
import Avatar from "../../components/Avatar";
import EmptyState from "../../components/EmptyState";
import ExpenseRow from "../../components/ExpenseRow";
import PageTitle from "../../components/PageTitle";
import { useAuth } from "../../context/AuthContext";
import { groups, people } from "../../data/mockData";
import { useDashboard } from "../../layouts/DashboardLayout";
import type { Group } from "../../types";
import { firstName, money } from "../../utils/format";

const groupIcons: Record<Group["icon"], typeof House> = {
  home: House,
  users: Users,
  calendar: CalendarDays,
};

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Overview() {
  const { user } = useAuth();
  const { expenses, goTo, openAddExpense } = useDashboard();

  // Balances placeholder: derived from mock per-person balances until the API provides them.
  const owedToYou = people.filter((p) => p.amount > 0).reduce((sum, p) => sum + p.amount, 0);
  const youOwe = people.filter((p) => p.amount < 0).reduce((sum, p) => sum - p.amount, 0);
  const net = owedToYou - youOwe;
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="hero-row">
        <PageTitle
          eyebrow={today}
          title={`${greeting()}, ${firstName(user?.name ?? "there")}.`}
          copy="Here’s where things stand with your shared expenses."
        />
        <button className="primary-button" onClick={openAddExpense}>
          <Plus size={17} /> Add expense
        </button>
      </div>

      <section className="balance-card">
        <div className="balance-copy">
          <span className="balance-label">Your total balance</span>
          <strong>
            {net >= 0 ? "+" : "−"}
            {money(Math.abs(net))}
          </strong>
          <p>
            {net >= 0 ? "You’re owed" : "You owe"} across {groups.length} groups
          </p>
          <div className="balance-actions">
            <button onClick={() => goTo("split")}>
              Settle up <ArrowRight size={15} />
            </button>
            <button onClick={() => goTo("reports")}>View details</button>
          </div>
        </div>
        <div className="balance-breakdown">
          <div>
            <span className="mini-icon mint">
              <ArrowDownLeft size={17} />
            </span>
            <p>
              You are owed <strong>{money(owedToYou)}</strong>
            </p>
          </div>
          <div>
            <span className="mini-icon lilac">
              <ArrowUpRight size={17} />
            </span>
            <p>
              You owe <strong>{money(youOwe)}</strong>
            </p>
          </div>
        </div>
        <div className="orb orb-one" />
        <div className="orb orb-two" />
      </section>

      <div className="overview-grid">
        {/* Balances placeholder */}
        <section className="panel">
          <div className="section-title">
            <div>
              <h2>Balances</h2>
              <p>Who owes what</p>
            </div>
            <button className="text-button" onClick={() => goTo("split")}>
              See all <ArrowRight size={15} />
            </button>
          </div>
          {people.length ? (
            <div className="people-list">
              {people.map((person) => (
                <div className="person-row" key={person.name}>
                  <Avatar initials={person.initials} tone={person.tone} />
                  <div>
                    <strong>{person.name}</strong>
                    <span>{person.amount > 0 ? "owes you" : "you owe"}</span>
                  </div>
                  <strong className={person.amount > 0 ? "positive" : "negative"}>
                    {money(Math.abs(person.amount))}
                  </strong>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<WalletCards size={20} />}
              title="You’re all settled up"
              copy="Balances with friends will show up here."
            />
          )}
        </section>

        {/* Groups placeholder */}
        <section className="panel">
          <div className="section-title">
            <div>
              <h2>Active groups</h2>
              <p>Your shared spaces</p>
            </div>
            <button className="icon-button" aria-label="Create group">
              <Plus size={18} />
            </button>
          </div>
          {groups.length ? (
            <div className="group-grid">
              {groups.map((group) => {
                const Icon = groupIcons[group.icon];
                return (
                  <button className="group-card" key={group.id}>
                    <span className={`group-icon ${group.tone}`}>
                      <Icon size={20} />
                    </span>
                    <strong>{group.name}</strong>
                    <small>{group.members} members</small>
                    <b className={group.balance >= 0 ? "positive" : "negative"}>
                      {group.balance >= 0 ? "+" : "−"}
                      {money(Math.abs(group.balance))}
                    </b>
                  </button>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={<Users size={20} />}
              title="No groups yet"
              copy="Create a group to start sharing expenses."
            />
          )}
        </section>
      </div>

      {/* Expenses placeholder */}
      <section className="panel recent-panel">
        <div className="section-title">
          <div>
            <h2>Recent activity</h2>
            <p>Your latest shared expenses</p>
          </div>
          <button className="text-button" onClick={() => goTo("expenses")}>
            All expenses <ArrowRight size={15} />
          </button>
        </div>
        {expenses.length ? (
          <div className="expense-list">
            {expenses.slice(0, 4).map((expense) => (
              <ExpenseRow expense={expense} key={expense.id} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<ReceiptText size={20} />}
            title="No expenses yet"
            copy="Add your first shared expense to see it here."
            action={
              <button className="primary-button" onClick={openAddExpense}>
                <Plus size={16} /> Add expense
              </button>
            }
          />
        )}
      </section>
    </>
  );
}

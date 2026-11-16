import {
  BarChart3,
  Bell,
  LayoutGrid,
  LogOut,
  ReceiptText,
  Settings,
  Split,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Outlet, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import AddExpenseModal from "../components/AddExpenseModal";
import Avatar from "../components/Avatar";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";
import { groups, initialExpenses } from "../data/mockData";
import type { Expense, View } from "../types";
import { initialsOf } from "../utils/format";

export const navItems: { id: View; label: string; path: string; icon: typeof LayoutGrid }[] = [
  { id: "home", label: "Overview", path: "/dashboard", icon: LayoutGrid },
  { id: "expenses", label: "Expenses", path: "/dashboard/expenses", icon: ReceiptText },
  { id: "split", label: "Split a bill", path: "/dashboard/split", icon: Split },
  { id: "reports", label: "Reports", path: "/dashboard/reports", icon: BarChart3 },
];

export type DashboardContext = {
  expenses: Expense[];
  openAddExpense: () => void;
  goTo: (view: View) => void;
};

export const useDashboard = () => useOutletContext<DashboardContext>();

export default function DashboardLayout() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [expenses, setExpenses] = useState(initialExpenses);
  const [showAdd, setShowAdd] = useState(false);

  const active = navItems.find((item) => item.path === pathname.replace(/\/$/, "")) ?? navItems[0];
  const goTo = (view: View) => navigate(navItems.find((item) => item.id === view)!.path);
  const initials = initialsOf(user?.name ?? "");

  const saveExpense = (expense: Expense) => {
    setExpenses((current) => [expense, ...current]);
    setShowAdd(false);
    goTo("expenses");
  };

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  const context: DashboardContext = { expenses, openAddExpense: () => setShowAdd(true), goTo };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Logo to="/dashboard" />
        <nav aria-label="Main navigation">
          <span className="nav-label">Workspace</span>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={active.id === item.id ? "active" : ""}
                onClick={() => navigate(item.path)}
                key={item.id}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <span className="nav-label secondary-label">Manage</span>
          <button>
            <Users size={18} />
            <span>Groups</span>
            <b>{groups.length}</b>
          </button>
          <button>
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>
        <div className="sidebar-profile">
          <Avatar initials={initials} small />
          <div>
            <strong>{user?.name}</strong>
            <span>{user?.email}</span>
          </div>
          <button className="logout-button" onClick={handleLogOut} aria-label="Log out" title="Log out">
            <LogOut size={15} />
          </button>
        </div>
      </aside>
      <main>
        <header className="topbar">
          <div className="mobile-logo">
            <Logo to="/dashboard" />
          </div>
          <span className="breadcrumb">
            SplitBuddy <b>/</b> {active.label}
          </span>
          <div className="top-actions">
            <button className="icon-button notification" aria-label="Notifications">
              <Bell size={18} />
              <i />
            </button>
            <button
              className="icon-button mobile-logout"
              onClick={handleLogOut}
              aria-label="Log out"
            >
              <LogOut size={17} />
            </button>
            <Avatar initials={initials} small />
          </div>
        </header>
        <div className="page-content">
          <Outlet context={context} />
        </div>
      </main>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              className={active.id === item.id ? "active" : ""}
              onClick={() => navigate(item.path)}
              key={item.id}
            >
              <Icon size={20} />
              <span>{item.label === "Split a bill" ? "Split" : item.label}</span>
            </button>
          );
        })}
      </nav>
      {showAdd && <AddExpenseModal onClose={() => setShowAdd(false)} onSave={saveExpense} />}
    </div>
  );
}

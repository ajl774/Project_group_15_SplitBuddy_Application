// Placeholder data used until the dashboard is wired to the Express/Postgres API in /server.
import type { Expense, Group, PersonBalance } from "../types";

export const initialExpenses: Expense[] = [
  { id: 1, title: "Weekend brunch", category: "Food", group: "Weekend Crew", paidBy: "You", amount: 124.8, date: "Today" },
  { id: 2, title: "Electricity bill", category: "Home", group: "Apartment 4B", paidBy: "Maya", amount: 86.4, date: "Yesterday" },
  { id: 3, title: "Groceries", category: "Shopping", group: "Apartment 4B", paidBy: "You", amount: 72.15, date: "May 22" },
  { id: 4, title: "Airport ride", category: "Transport", group: "Lisbon Trip", paidBy: "Noah", amount: 48.5, date: "May 20" },
  { id: 5, title: "Dinner at Sora", category: "Food", group: "Weekend Crew", paidBy: "Jamie", amount: 96.2, date: "May 18" },
];

export const people: PersonBalance[] = [
  { name: "Maya Chen", initials: "MC", amount: 68.2, tone: "purple" },
  { name: "Noah Williams", initials: "NW", amount: 42.5, tone: "blue" },
  { name: "Jamie Lee", initials: "JL", amount: -24.8, tone: "pink" },
];

export const groups: Group[] = [
  { id: 1, name: "Apartment 4B", members: 4, balance: 56.2, icon: "home", tone: "violet" },
  { id: 2, name: "Weekend Crew", members: 5, balance: -24.8, icon: "users", tone: "blue" },
  { id: 3, name: "Lisbon Trip", members: 3, balance: 54.5, icon: "calendar", tone: "pink" },
];

export type View = "home" | "expenses" | "split" | "reports";

export type Category = "Food" | "Home" | "Shopping" | "Transport";

export type Expense = {
  id: number;
  title: string;
  category: Category;
  group: string;
  paidBy: string;
  amount: number;
  date: string;
};

export type Tone = "purple" | "blue" | "pink" | "green";

export type PersonBalance = {
  name: string;
  initials: string;
  /** Positive = they owe you, negative = you owe them */
  amount: number;
  tone: Tone;
};

export type Group = {
  id: number;
  name: string;
  members: number;
  /** Your net balance in this group */
  balance: number;
  icon: "home" | "users" | "calendar";
  tone: "violet" | "blue" | "pink";
};

export type User = {
  id: number;
  name: string;
  email: string;
};

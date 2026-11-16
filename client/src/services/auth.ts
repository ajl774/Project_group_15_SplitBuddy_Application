// Client-side auth placeholder.
// The Express server (../server) does not expose login/signup routes yet, so accounts are
// kept in localStorage. Replace these functions with fetch("/api/login") etc. once the
// endpoints exist — the rest of the app only talks to this module through AuthContext.
import type { User } from "../types";

const USERS_KEY = "splitbuddy.users";
const SESSION_KEY = "splitbuddy.session";

type StoredUser = User & { password: string };

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — session simply won't persist */
  }
}

const strip = ({ password: _password, ...user }: StoredUser): User => user;

export function getSession(): User | null {
  return read<User | null>(SESSION_KEY, null);
}

export async function signUp(name: string, email: string, password: string): Promise<User> {
  const users = read<StoredUser[]>(USERS_KEY, []);
  const normalized = email.trim().toLowerCase();
  if (users.some((u) => u.email === normalized)) {
    throw new Error("An account with this email already exists.");
  }
  const stored: StoredUser = { id: Date.now(), name: name.trim(), email: normalized, password };
  write(USERS_KEY, [...users, stored]);
  const user = strip(stored);
  write(SESSION_KEY, user);
  return user;
}

export async function logIn(email: string, password: string): Promise<User> {
  const users = read<StoredUser[]>(USERS_KEY, []);
  const match = users.find((u) => u.email === email.trim().toLowerCase());
  if (!match || match.password !== password) {
    throw new Error("Incorrect email or password.");
  }
  const user = strip(match);
  write(SESSION_KEY, user);
  return user;
}

export function logOut() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

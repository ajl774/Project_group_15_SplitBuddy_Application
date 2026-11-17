
import type { User } from "../types";

const SESSION_KEY = "splitbuddy.session";

const API_URL = "/api/auth";

export function getSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function saveSession(user: User): User {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
}

export async function signUp(
  name: string,
  email: string,
  username: string,
  password: string
): Promise<User> {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Unable to create account.");
  }

  return saveSession(data.user);
}

export async function logIn(
  username: string,
  password: string
): Promise<User> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Incorrect username or password.");
  }

  return saveSession(data.user);
}

export function logOut() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // Ignore storage errors.
  }
}

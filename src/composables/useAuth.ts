const SESSION_KEY = "ticketapp_session";

export function setSession(token: string) {
  localStorage.setItem(SESSION_KEY, token);
}

export function getSession(): any | null {
  const stored = localStorage.getItem(SESSION_KEY);
  try {
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (!email || !password) throw new Error("Email and password are required");
  if (password.length < 8) throw new Error("Invalid credentials");

  const token = {
    email,
    token: "mock-token",
    createdAt: Date.now(),
  };

  setSession(JSON.stringify(token));
  return token;
}

export function signup({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return login({ email, password });
}

import type { LoginFormValues } from "@/types/auth";

export const demoUser = {
  id: "user-1",
  email: "john@tentwenty.com",
  name: "John Doe",
  password: "password123",
};

function getNameFromEmail(email: string) {
  const [localPart] = email.split("@");

  return localPart
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ") || demoUser.name;
}

export function verifyDemoCredentials(
  credentials: Pick<LoginFormValues, "email" | "password">,
) {
  const { email, password } = credentials;
  const normalizedEmail = email.trim().toLowerCase();
  const isAllowedUser =
    normalizedEmail === demoUser.email && password === demoUser.password;

  if (!isAllowedUser) {
    return null;
  }

  return {
    id: normalizedEmail,
    email: normalizedEmail,
    name: getNameFromEmail(normalizedEmail),
  };
}

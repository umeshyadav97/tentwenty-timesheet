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

export function verifyDemoCredentials(email?: string, password?: string) {
  if (!email || !password) {
    return null;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = password;
  const isAllowedUser =
    normalizedEmail === demoUser.email &&
    normalizedPassword === demoUser.password;

  if (!isAllowedUser) {
    return null;
  }

  return {
    id: normalizedEmail,
    email: normalizedEmail,
    name: getNameFromEmail(normalizedEmail),
  };
}

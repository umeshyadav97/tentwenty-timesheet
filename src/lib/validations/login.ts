import { z } from "zod";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .regex(emailPattern, "Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .refine((value) => !/\s/.test(value), "Password cannot contain spaces")
    .min(8, "Password must be at least 8 characters"),
  remember: z.boolean(),
});

export const loginInitialValues = {
  email: "",
  password: "",
  remember: false,
};

export type LoginFormValues = z.infer<typeof loginSchema>;

export function parseLoginCredentials(credentials: unknown) {
  return loginSchema
    .pick({ email: true, password: true })
    .safeParse(credentials);
}

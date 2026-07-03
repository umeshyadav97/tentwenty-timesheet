import type { FormikErrors } from "formik";
import type { LoginFormValues } from "@/types/auth";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginInitialValues: LoginFormValues = {
  email: "",
  password: "",
  remember: false,
};

export function validateLoginForm(
  values: LoginFormValues,
): FormikErrors<LoginFormValues> {
  const errors: FormikErrors<LoginFormValues> = {};

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (/\s/.test(values.password)) {
    errors.password = "Password cannot contain spaces";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
}

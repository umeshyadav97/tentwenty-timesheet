"use client";

import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TextField } from "@/components/ui/text-field";
import {
  loginInitialValues,
  validateLoginForm,
} from "@/lib/validations/login";
import type { LoginFormValues } from "@/types/auth";

export function LoginForm() {
  const formik = useFormik<LoginFormValues>({
    initialValues: loginInitialValues,
    validate: validateLoginForm,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => {
      // Auth integration will be connected when the login flow is implemented.
    },
  });

  const showErrors = formik.submitCount > 0;
  const emailError =
    (formik.touched.email || showErrors) && formik.errors.email
      ? formik.errors.email
      : undefined;
  const passwordError =
    (formik.touched.password || showErrors) && formik.errors.password
      ? formik.errors.password
      : undefined;

  return (
    <form
      className="w-full max-w-md"
      aria-label="Login form"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <h1 className="text-base font-bold leading-none text-ink">Welcome back</h1>

      <div className="mt-5 space-y-4">
        <TextField
          label="Email"
          name="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          value={formik.values.email ?? ""}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={emailError}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={formik.values.password ?? ""}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={passwordError}
        />
      </div>

      <div className="mt-4">
        <Checkbox
          checked={formik.values.remember === true}
          label="Remember me"
          name="remember"
          onBlur={() => formik.setFieldTouched("remember", true)}
          onChange={(event) => {
            formik.setFieldValue("remember", event.currentTarget.checked);
          }}
        />
      </div>

      <Button type="submit" className="mt-4 w-full">
        Sign in
      </Button>
    </form>
  );
}

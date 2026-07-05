"use client";

import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { TextField } from "@/components/ui/text-field";
import {
  loginInitialValues,
  validateLoginForm,
} from "@/lib/validations/login";
import type { LoginFormValues } from "@/types/auth";

export function LoginForm() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const formik = useFormik<LoginFormValues>({
    initialValues: loginInitialValues,
    validate: validateLoginForm,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, helpers) => {
      setAuthError(null);

      const result = await signIn("credentials", {
        email: values.email.trim(),
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setAuthError("Use john@tentwenty.com and password123 to sign in.");
        helpers.setSubmitting(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
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
      <h1 className="text-base font-bold leading-none text-slate-950">
        Welcome back
      </h1>

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

      <p className="mt-3 text-xs leading-5 text-slate-500">
        Email: john@tentwenty.com · Password: password123
      </p>

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

      {authError ? (
        <p className="mt-4 rounded-md bg-red-50 p-3 text-xs text-red-700">
          {authError}
        </p>
      ) : null}

      <Button
        type="submit"
        className="mt-4 w-full"
        disabled={formik.isSubmitting}
      >
        <span className="inline-flex items-center justify-center gap-2">
          {formik.isSubmitting ? <Spinner className="size-3" /> : null}
          {formik.isSubmitting ? "Signing in..." : "Sign in"}
        </span>
      </Button>
    </form>
  );
}

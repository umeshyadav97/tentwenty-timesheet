"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { OverlayLoader } from "@/components/ui/overlay-loader";
import { TextField } from "@/components/ui/text-field";
import { loginInitialValues, loginSchema } from "@/lib/validations/login";
import type { LoginFormValues } from "@/types/auth";

export function LoginForm() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    defaultValues: loginInitialValues,
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setAuthError(null);

    const result = await signIn("credentials", {
      email: values.email.trim(),
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      setAuthError("Use john@tentwenty.com and password123 to sign in.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  });

  return (
    <form
      className="relative w-full max-w-md"
      aria-label="Login form"
      onSubmit={onSubmit}
      noValidate
    >
      <h1 className="text-base font-bold leading-none text-slate-950">
        Welcome back
      </h1>

      <div className="mt-5 space-y-4">
        <TextField
          label="Email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-500">
        Use-Email: john@tentwenty.com - Password: password123
      </p>

      <div className="mt-4">
        <Checkbox label="Remember me" {...register("remember")} />
      </div>

      {authError ? (
        <p className="mt-4 rounded-md bg-red-50 p-3 text-xs text-red-700">
          {authError}
        </p>
      ) : null}

      <Button type="submit" className="mt-4 w-full" disabled={isSubmitting}>
        Sign in
      </Button>

      {isSubmitting ? (
        <OverlayLoader label="Signing in..." variant="fullscreen" />
      ) : null}
    </form>
  );
}

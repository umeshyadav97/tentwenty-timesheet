import { LoginBrandPanel } from "@/components/auth/login-brand-panel";
import { LoginForm } from "@/components/auth/login-form";
import { getAuthSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-dvh bg-white text-slate-950">
      <section className="grid min-h-dvh md:grid-cols-2">
        <div className="flex min-h-dvh items-center justify-center bg-white px-6 py-12 sm:px-10 md:justify-start md:px-16 xl:px-20">
          <LoginForm />
        </div>
        <LoginBrandPanel />
      </section>
    </main>
  );
}

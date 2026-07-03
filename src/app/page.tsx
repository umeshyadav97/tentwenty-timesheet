import { LoginBrandPanel } from "@/components/auth/login-brand-panel";
import { LoginForm } from "@/components/auth/login-form";

export default function Home() {
  return (
    <main className="min-h-dvh bg-white text-ink">
      <section className="flex min-h-dvh flex-col lg:grid lg:grid-cols-2">
        <div className="flex flex-1 items-center justify-center bg-white px-6 py-12 sm:px-10 md:px-16 lg:min-h-dvh lg:justify-start lg:px-16 xl:px-20">
          <LoginForm />
        </div>
        <LoginBrandPanel />
      </section>
    </main>
  );
}

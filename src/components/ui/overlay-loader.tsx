import { Spinner } from "@/components/ui/spinner";

type OverlayLoaderProps = {
  label?: string;
  variant?: "contained" | "fullscreen";
};

export function OverlayLoader({
  label = "Loading...",
  variant = "contained",
}: OverlayLoaderProps) {
  const wrapperClassName =
    variant === "fullscreen"
      ? "fixed inset-0 z-50"
      : "absolute inset-0 z-10 rounded-md";
  const spinnerClassName =
    variant === "fullscreen" ? "size-8 text-blue-600" : "size-6 text-blue-600";

  return (
    <div
      className={`${wrapperClassName} flex items-center justify-center bg-white/75 backdrop-blur-sm`}
    >
      <Spinner className={spinnerClassName} />
      <span className="sr-only">{label}</span>
    </div>
  );
}

import { LoaderCircle } from "lucide-react";

type SpinnerProps = {
  className?: string;
};

export function Spinner({ className = "size-4 text-blue-600" }: SpinnerProps) {
  return (
    <LoaderCircle
      aria-hidden="true"
      className={`${className} animate-spin`}
    />
  );
}

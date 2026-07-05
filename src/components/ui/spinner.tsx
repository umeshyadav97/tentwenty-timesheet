import { LoaderCircle } from "lucide-react";

type SpinnerProps = {
  className?: string;
};

export function Spinner({ className = "size-4" }: SpinnerProps) {
  return (
    <LoaderCircle
      aria-hidden="true"
      className={`${className} animate-spin`}
    />
  );
}

import type { FormRowProps } from "./types";

export function FormRow({ children }: FormRowProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3">
      {children}
    </div>
  );
}


import type { RowFormProps } from "./types";

export function RowForm({ children }: RowFormProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3">
      {children}
    </div>
  );
}


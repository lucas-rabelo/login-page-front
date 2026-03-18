import type { ReactNode } from "react";

type RowFormProps = {
  children: ReactNode;
};

export function RowForm({ children }: RowFormProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3">
      {children}
    </div>
  );
}

import type { ContentProps } from "./types";

export function Content({ children }: ContentProps) {
  return (
    <main className="flex-1 p-8">
      {children}
    </main>
  );
}


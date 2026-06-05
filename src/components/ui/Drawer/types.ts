import type { ReactNode } from "react";
import type { drawer } from "./styles";
import type { VariantProps } from "tailwind-variants";

export type DrawerProps = VariantProps<typeof drawer> & {
  title?: string;
  onClose: () => void;
  children: ReactNode;
};


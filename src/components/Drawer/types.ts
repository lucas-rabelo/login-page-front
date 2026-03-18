import type { ReactNode } from "react";

export type DrawerProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
};


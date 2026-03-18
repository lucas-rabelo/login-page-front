import type { ButtonHTMLAttributes } from "react";

export type ButtonSecondaryProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  color?: string;
  textColor?: string;
  size?: string;
};


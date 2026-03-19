import type { ComponentProps } from "react";
import type { VariantProps } from "tailwind-variants";
import type { button } from "./styles";

export type ButtonProps = ComponentProps<"button"> & VariantProps<typeof button> & {
  label: string;
  isGoogleButton?: boolean;
};

import type { ComponentProps, ReactNode } from "react";
import { type VariantProps } from "tailwind-variants";
import type { formWrapper } from "./styles";

export type FormWrapperProps = ComponentProps<"form"> & VariantProps<typeof formWrapper> & {
  children: ReactNode;
};
import type { ReactNode } from "react";
import type { VariantProps } from "tailwind-variants";
import type { containerForm } from "./styles";

export type ContainerFormProps = VariantProps<typeof containerForm> & {
  children: ReactNode;
};
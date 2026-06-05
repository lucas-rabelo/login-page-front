import type { ComponentProps, ReactNode } from "react";
import type { field } from "./styles";
import type { VariantProps } from "tailwind-variants";

export type FieldProps = ComponentProps<"div"> & VariantProps<typeof field> & {
  children: ReactNode;
};


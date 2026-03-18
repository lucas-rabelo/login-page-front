import type { ComponentProps } from "react";

export type CheckboxProps = ComponentProps<"input"> & {
  label: string;
};


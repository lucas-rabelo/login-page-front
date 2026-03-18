import type {
  Control,
  FieldValues,
  Path,
} from "react-hook-form";
import type { ComponentProps, ReactNode } from "react";

export type InputFormProps<T extends FieldValues> = ComponentProps<"input"> & {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: string;
  isPasswordInput?: boolean;
  children?: ReactNode;
};


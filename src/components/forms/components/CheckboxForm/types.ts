import type { Control, FieldValues, Path } from "react-hook-form";

export type CheckboxFormProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
};


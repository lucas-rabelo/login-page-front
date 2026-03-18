import type { Control, FieldValues, Path } from "react-hook-form";
import type { Option } from "../../../../types/select";

export type SelectFormProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: string;
  options: Option[];
};


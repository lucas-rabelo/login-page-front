import { Controller, type FieldValues } from "react-hook-form";
import { Checkbox } from "../Checkbox";

import type { CheckboxFormProps } from "./types";

export function CheckboxForm<T extends FieldValues>({
  control,
  name,
  label,
}: CheckboxFormProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ }) => (
        <Checkbox
          label={label}
        />
      )}
    />
  );
}


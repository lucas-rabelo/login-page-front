import { Controller, FieldValues } from "react-hook-form";
import { Field } from "../../../ui/Field";
import { Error } from "../../../ui/Error";
import { Label } from "../../../ui/Label";
import { Select } from "../../../ui/Select";

import type { SelectFormProps } from "./types";

export function SelectForm<T extends FieldValues>({
  label,
  name,
  error,
  control,
  options,
}: SelectFormProps<T>) {
  return (
    <Field>
      <Label label={label} />
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select options={options} onChange={onChange} value={value} />
        )}
      />
      <Error error={error} />
    </Field>
  );
}


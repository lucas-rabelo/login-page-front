import { Controller, FieldValues } from "react-hook-form";
import { Container } from "../Container";
import { Error } from "../Error";
import { Label } from "../Label";
import { Select } from "../Select";

import type { SelectFormProps } from "./types";

export function SelectForm<T extends FieldValues>({
  label,
  name,
  error,
  control,
  options,
}: SelectFormProps<T>) {
  return (
    <Container>
      <Label label={label} />
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select options={options} onChange={onChange} value={value} />
        )}
      />
      <Error error={error} />
    </Container>
  );
}


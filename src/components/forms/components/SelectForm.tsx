import { Controller, type Control, FieldValues, type Path } from "react-hook-form";
import type { Option } from "../../../types/select";
import { Error } from "./Error";
import { Label } from "./Label";
import { Container } from "./Container";
import { Select } from "./Select";

type SelectFormProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: string;
  options: Option[];
};

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

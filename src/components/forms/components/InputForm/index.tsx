import {
  Controller,
  FieldValues
} from "react-hook-form";
import { Field } from "../../../ui/Field";
import { Error } from "../../../ui/Error";
import { Input } from "../../../ui/Input";
import { Label } from "../../../ui/Label";

import type { InputFormProps } from "./types";

export function InputForm<T extends FieldValues>({
  label,
  name,
  error,
  control,
  isPasswordInput,
  children,
  ...props
}: InputFormProps<T>) {
  return (
    <Field hasButton={isPasswordInput}>
      <Label label={label} />
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChange={onChange}
            value={value}
            {...props}
          />
        )}
      />
      {children}
      <Error error={error} />
    </Field>
  );
}


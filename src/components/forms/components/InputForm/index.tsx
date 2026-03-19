import {
  Controller,
  FieldValues
} from "react-hook-form";
import { ContainerField } from "../ContainerField";
import { Error } from "../Error";
import { Input } from "../Input";
import { Label } from "../Label";

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
    <ContainerField hasButton={isPasswordInput}>
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
    </ContainerField>
  );
}


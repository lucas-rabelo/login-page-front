import {
  Controller,
  FieldValues,
  type Control,
  type Path,
} from "react-hook-form";
import { Error } from "../Error";
import { Input } from "../Input";
import { Label } from "../Label";
import { Container } from "../Container";

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
    <Container hasButton={isPasswordInput}>
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
    </Container>
  );
}


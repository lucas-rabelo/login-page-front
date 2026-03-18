import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { Checkbox } from "./Checkbox";

type CheckboxFormProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
};

export function CheckboxForm<T extends FieldValues>({
  control,
  name,
  label,
}: CheckboxFormProps<T>) {
  return(
    <Controller 
      control={control}
      name={name}
      render={({}) => (
        <Checkbox 
          label={label}
        />
      )}
    />
  );
}

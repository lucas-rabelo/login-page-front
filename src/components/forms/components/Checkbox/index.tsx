import type { CheckboxProps } from "./types";

export function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <input type="checkbox" {...props} />
      <label>{label}</label>
    </div>
  );
}


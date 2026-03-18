import { SpinnerGap } from "@phosphor-icons/react";

import type { ButtonProps } from "./types";

export function Button({ label, disabled, ...rest }: ButtonProps) {
  return (
    <button
      className={`rounded ${disabled ? "bg-gray-600 flex items-center justify-center gap-2" : "bg-green-700"} text-white py-4 px-8 w-full`}
      {...rest}
    >
      {disabled && <SpinnerGap className="animate-spin" size={24} />}
      {label}
    </button>
  );
}

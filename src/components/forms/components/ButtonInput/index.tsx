import { Eye, EyeSlash } from "@phosphor-icons/react";

import type { ButtonInputProps } from "./types";

export function ButtonInput({ actionValue, setAction }: ButtonInputProps) {
  return (
    <button
      type="button"
      className="absolute p-4 right-1 top-[33px]"
      onClick={() => setAction(!actionValue)}
    >
      {actionValue ? <EyeSlash size={24} /> : <Eye size={24} />}
    </button>
  );
}


import { field } from "./styles";
import type { FieldProps } from "./types";

export function Field({ children, hasButton }: FieldProps) {
  return(
    <div className={field({ hasButton })}>
      {children}
    </div>
  )
}


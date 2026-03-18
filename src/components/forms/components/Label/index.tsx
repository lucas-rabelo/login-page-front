import type { LabelProps } from "./types";

export function Label({ label }: LabelProps) {
  return(
    <span className="font-normal text-lg">{label}</span>
  )
}


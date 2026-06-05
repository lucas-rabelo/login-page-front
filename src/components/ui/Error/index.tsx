import type { ErrorProps } from "./types";

export function Error({ error }: ErrorProps) {
  if(!error) return null;

  return(
    <span className="text-red-500">{error}</span>
  )
}


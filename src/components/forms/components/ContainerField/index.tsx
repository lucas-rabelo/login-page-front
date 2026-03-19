import type { ContainerFieldProps } from "./types";

export function ContainerField({ children, hasButton = false }: ContainerFieldProps) {
  return(
    <div className={`${hasButton && 'relative'} flex flex-col gap-1 w-full`}>
      {children}
    </div>
  )
}


import type { ReactNode } from "react"

type ContainerProps = {
  children: ReactNode;
  hasButton?: boolean;
}

export function Container({ children, hasButton = false }: ContainerProps) {
  return(
    <div className={`${hasButton && 'relative'} flex flex-col gap-1 w-full`}>
      {children}
    </div>
  )
}
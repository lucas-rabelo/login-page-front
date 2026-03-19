import { containerForm } from "./styles";
import type { ContainerFormProps } from "./types";

export function ContainerForm({ children }: ContainerFormProps) {
  return(
    <div className={containerForm()}>
      {children}
    </div>
  )
}
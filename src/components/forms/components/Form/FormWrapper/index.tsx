import { ContainerForm } from "../../ContainerForm";
import { formWrapper } from "./styles";
import type { FormWrapperProps } from "./types";

export function FormWrapper({ children, ...props }: FormWrapperProps) {
  return (
    <ContainerForm>
      <form className={formWrapper()} {...props}>
        {children}
      </form>
    </ContainerForm>
  );
}

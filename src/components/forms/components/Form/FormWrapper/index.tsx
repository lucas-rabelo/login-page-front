import { ContainerForm } from "../../ContainerForm";
import { formWrapper } from "./styles";
import type { FormWrapperProps } from "./types";

export function FormWrapper({ gap, children, ...props }: FormWrapperProps) {
  return (
    <ContainerForm>
      <form className={formWrapper({ gap })} {...props}>
        {children}
      </form>
    </ContainerForm>
  );
}

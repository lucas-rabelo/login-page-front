import { formWrapper } from "./styles";
import type { FormWrapperProps } from "./types";

export function FormWrapper({ gap, isSmallContainer, children, ...props }: FormWrapperProps) {
  const { base, wrapper } = formWrapper({ isSmallContainer });

  return (
    <div className={wrapper()}>
      <form className={base({ gap })} {...props}>
        {children}
      </form>
    </div>
  );
}

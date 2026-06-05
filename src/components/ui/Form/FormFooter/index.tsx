import { formFooter } from "./styles";
import type { FormFooterProps } from "./types";

export function FormFooter({
  marginTop,
  setChangeTypeForm,
  text,
  textLink,
  formType,
}: FormFooterProps) {
  const { container, link } = formFooter({ marginTop });

  return (
    <span className={container()}>
      {text}
      <a className={link()} onClick={() => setChangeTypeForm(formType)}>
        {textLink}
      </a>
    </span>
  );
}

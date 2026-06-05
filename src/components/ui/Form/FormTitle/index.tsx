import { formTitle } from "./styles";
import type { FormTitleProps } from "./types";

export function FormTitle({ title, subtitle }: FormTitleProps) {
  const { container, subtitle: subtitleClass, title: titleClass } = formTitle();

  return (
    <div className={container()}>
      <h3 className={subtitleClass()}>{subtitle}</h3>
      <h1 className={titleClass()}>{title}</h1>
    </div>
  );
}

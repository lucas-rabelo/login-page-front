import { titleForm } from "./styles";
import type { TitleFormProps } from "./types";

export function TitleForm({ title, subtitle }: TitleFormProps) {
  const { container, subtitle: subtitleClass, title: titleClass } = titleForm();

  return (
    <div className={container()}>
      <h3 className={subtitleClass()}>{subtitle}</h3>
      <h1 className={titleClass()}>{title}</h1>
    </div>
  );
}

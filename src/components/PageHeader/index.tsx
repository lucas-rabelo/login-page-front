import { Button } from "../Button";
import { pageHeader } from "./styles";
import type { PageHeaderProps } from "./types";

export function PageHeader({ onCreateNew }: PageHeaderProps) {
  return (
    <div className={pageHeader()}>
      <Button
        label="Novo usuário"
        size="contain"
        padding="medium"
        onClick={onCreateNew}
      />
    </div>
  );
}

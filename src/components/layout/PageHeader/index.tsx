import { Button } from "../../ui/Button";
import { pageHeader } from "./styles";
import type { PageHeaderProps } from "./types";

export function PageHeader({ onCreateNew }: PageHeaderProps) {
  return (
    <div className={pageHeader()}>
      <Button
        label="Novo usuário"
        size="contain"
        onClick={onCreateNew}
      />
    </div>
  );
}

import { tableWrapper } from "./styles";
import type { TableWrapperProps } from "./types";

export function TableWrapper({ children }: TableWrapperProps) {
  const { wrapper, table } = tableWrapper();

  return(
    <div className={wrapper()}>
      <table className={table()}>
        {children}
      </table>
    </div>
  );
}
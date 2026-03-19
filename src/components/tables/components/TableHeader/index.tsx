import { tableHeader } from "./styles";
import type { TableHeaderProps } from "./types";

export function TableHeader({ columns }: TableHeaderProps) {
  const { header, col } = tableHeader();

  return (
    <thead className={header()}>
      <tr>
        {columns?.map(({ name, value, align }) => (
          <th
            key={value}
            scope="col"
            className={col({ align })}
          >
            {name}
          </th>
        ))}
      </tr>
    </thead>
  );
}

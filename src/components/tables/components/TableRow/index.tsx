import { tableRow } from "./styles";
import type { TableRowProps } from "./types";

export function TableRow({ columns }: TableRowProps) {
  const { content } = tableRow();

  return (
    <tbody className={content()}>
      <tr>
        {columns?.map(({ name, value, align }) => (
          <th
            key={value}
            scope="col"
            className={content({ align })}
          >
            {name}
          </th>
        ))}
      </tr>
    </tbody>
  );
}

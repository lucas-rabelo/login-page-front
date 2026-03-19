import type { VariantProps } from "tailwind-variants";
import type { tableRow } from "./styles";

type Columns = {
  name: string;
  value: string;
  align?: VariantProps<typeof tableRow>["align"];
}

export type TableRowProps = {
  columns?: Columns[];
};
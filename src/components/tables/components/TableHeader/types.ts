import type { VariantProps } from "tailwind-variants";
import type { tableHeader } from "./styles";

type Columns = {
  name: string;
  value: string;
  align?: VariantProps<typeof tableHeader>["align"];
}

export type TableHeaderProps = {
  columns?: Columns[];
};
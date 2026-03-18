import type { ComponentProps } from "react";
import type { Option } from "../../../../types/select";

export type SelectProps = ComponentProps<"select"> & {
  options: Option[];
};


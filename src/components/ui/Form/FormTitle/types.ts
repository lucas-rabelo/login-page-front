import { type VariantProps } from "tailwind-variants";
import type { formTitle } from "./styles";

export type FormTitleProps = VariantProps<typeof formTitle> & {
  title: string;
  subtitle?: string;
}
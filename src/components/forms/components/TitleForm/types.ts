import { type VariantProps } from "tailwind-variants";
import type { titleForm } from "./styles";

export type TitleFormProps = VariantProps<typeof titleForm> & {
  title: string;
  subtitle?: string;
}
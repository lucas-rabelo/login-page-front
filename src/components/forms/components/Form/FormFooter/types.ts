import { type VariantProps } from "tailwind-variants";
import type { FormTypeProps } from "../../../../../types/form";
import type { formFooter } from "./styles";

export type FormFooterProps = VariantProps<typeof formFooter> & {
  setChangeTypeForm: (type: FormTypeProps) => void;
  text: string;
  textLink: string;
  formType: FormTypeProps;
}
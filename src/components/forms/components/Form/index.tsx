import type { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const form = tv({
  base: "flex flex-col w-full md:w-[500px] lg:w-[400px]",
  variants: {
    gap: {
      4: "gap-4",
      6: "gap-6",
    }
  },
  defaultVariants: {
    gap: 4,
  }
});

export type FormProps = ComponentProps<"form"> & VariantProps<typeof form> & {
  children: ReactNode;
};

export function Form({ children, ...props }: FormProps) {
  return(
    <form className={form()} { ...props }>
      {children}
    </form>
  );
}
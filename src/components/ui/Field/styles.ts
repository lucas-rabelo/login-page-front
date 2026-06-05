import { tv } from "tailwind-variants";

export const field = tv({
  base: "flex flex-col gap-1 w-full",
  variants: {
    hasButton: {
      true: "relative",
      false: "",
    }
  },
  defaultVariants: {
    hasButton: false,
  },
});

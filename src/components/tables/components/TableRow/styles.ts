import { tv } from "tailwind-variants";

export const tableRow = tv({
  slots: {
    content: "px-6 py-3"
  },
  variants: {
    align: {
      center: {
        content: "text-center"
      },
      left: {
        content: "text-left"
      },
      right: {
        content: "text-right"
      }
    }
  },
  defaultVariants: {
    align: "left"
  }
});
import { tv } from "tailwind-variants";

export const tableHeader = tv({
  slots: {
    header: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
    col: "px-6 py-3"
  },
  variants: {
    align: {
      center: {
        col: "text-center"
      },
      left: {
        col: "text-left"
      },
      right: {
        col: "text-right"
      }
    }
  },
  defaultVariants: {
    align: "left"
  }
});
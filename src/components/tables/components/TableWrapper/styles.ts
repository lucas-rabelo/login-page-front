import { tv } from "tailwind-variants";

export const tableWrapper = tv({
  slots: {
      wrapper: "relative overflow-x-auto shadow-md sm:rounded-lg",
      table: "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
  }
});
import { tv } from "tailwind-variants";

export const formTitle = tv({
  slots: {
    container: "flex flex-col gap-1",
    subtitle: "font-medium text-xl",
    title: "font-bold text-2xl"
  },
});
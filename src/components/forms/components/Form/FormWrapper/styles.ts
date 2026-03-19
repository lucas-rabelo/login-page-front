import { tv } from "tailwind-variants";

export const formWrapper = tv({
  base: "flex flex-col w-full md:w-[500px] lg:w-[400px]",
  variants: {
    gap: {
      3: "gap-3",
      4: "gap-4",
      6: "gap-6",
    },
  },
});

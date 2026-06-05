import { tv } from "tailwind-variants";

export const formWrapper = tv({
  slots: {
    base: "flex flex-col w-full",
    wrapper: "flex flex-col pb-12 pt-[300px] md:py-5 px-8 h-auto md:h-screen w-full bg-white"
  },
  variants: {
    gap: {
      3: "gap-3",
      4: "gap-4",
      6: "gap-6",
    },
    isSmallContainer: {
      true: {
        base: "md:w-[500px] lg:w-[400px]",
        wrapper: "items-center justify-center lg:w-1/2"
      },
      false: {
        base: "",
        wrapper: "",
      }
    }
  },
  defaultVariants: {
    isSmallContainer: false,
  }
});


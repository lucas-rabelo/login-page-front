import { tv } from "tailwind-variants";

export const formFooter = tv({
  slots: {
    container: "text-center font-medium",
    link: "cursor-pointer text-green-500 ml-1"
  },
  variants: {
    marginTop: {
      4: {
        container: "mt-4",
      },
      5: {
        container: "mt-5",
      }
    }
  },
  defaultVariants: {
    marginTop: 4,
  }
});

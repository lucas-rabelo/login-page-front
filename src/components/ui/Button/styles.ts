import { tv } from 'tailwind-variants';

export const button = tv({
  base: 'flex items-center justify-center rounded hover:opacity-65 duration-300 gap-2',
  variants: {
    padding: {
      small: "py-2 px-4",
      medium: "py-4 px-8",
    },
    variant: {
      primary: "bg-green-700",
      google: "bg-slate-800",
    },
    disabled: {
      true: "bg-gray-600",
      false: "",
    },
    textColor: {
      black: "text-black",
      white: "text-white",
    },
    size: {
      full: "w-full",
      contain: "w-[150px]",
    },
  },
  defaultVariants: {
    padding: "small",
    disabled: true,
    textColor: "white",
    size: "full",
  },
});
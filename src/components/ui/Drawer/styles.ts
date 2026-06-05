import { tv } from "tailwind-variants";

export const drawer = tv({
  slots: {
    wrapper: "fixed inset-y-0 right-0 transform transition-transform duration-300 ease-in-out bg-slate-100 shadow-2xl w-[80%] sm:w-[80%] md:w-[60%]",
    header: "w-full flex items-center justify-between py-3 px-6",
    titleTag: "text-base font-bold",
    closeButton: "flex items-center gap-1 bg-red-600 rounded text-white p-2",
    content: "flex-1 w-full h-full p-4 bg-white",
  },
  variants: {
    isOpen: {
      true: {
        wrapper: "translate-x-0",
      },
      false: {
        wrapper: "translate-x-full",
      }
    }
  },
  defaultVariants: {
    isOpen: false,
  },
})
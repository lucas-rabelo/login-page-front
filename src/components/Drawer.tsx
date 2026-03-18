import { X } from "@phosphor-icons/react";
import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export function Drawer({ isOpen = true, title, onClose, children }: Props) {
  return (
    <div
      className={`fixed inset-y-0 right-0 transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out bg-slate-100 shadow-2xl w-[80%] sm:w-[80%] md:w-[60%]`}
    >
      <div className="w-full flex items-center justify-between py-3 px-6">
        {title && <h1 className="text-base font-bold">{title}</h1>}
        <button
          onClick={onClose}
          className="flex items-center gap-1 bg-red-600 rounded text-white p-2"
        >
          Fechar
          <X />
        </button>
      </div>

      <div className="flex-1 w-full h-full p-4 bg-white">{children}</div>
    </div>
  );
}

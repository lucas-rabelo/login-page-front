import type { InputProps } from "./types";

export function Input({ ...props }: InputProps) {
  return (
    <input 
      className="w-full font-normal text-gray-600 bg-slate-50 p-4 rounded border-[1px] border-slate-300" 
      {...props}  
    />
  );
}


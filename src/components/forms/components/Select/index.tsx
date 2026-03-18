import type { Option } from "../../../../types/select";

import type { SelectProps } from "./types";

export function Select({ options, ...props }: SelectProps) {
  const optionsForSelect: Option[] = options.concat([{ value: '', label: 'Selecione uma opção' }])

  return(
    <select
      className="w-full font-normal text-gray-600 bg-slate-50 px-4 py-5 rounded border-[1px] border-slate-300"
      {...props}
    >
      {optionsForSelect.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}


import { Pencil, Trash } from "@phosphor-icons/react";
import { ButtonSecondary } from "../ButtonSecondary";
import type { ReadUserDto } from "../../types/user";

type Props = {
    data: ReadUserDto[];

    onDelete: (uuid: string) => Promise<void>;
    onEdit: (uuid: string) => void;
    onCreateNew: () => void;
}

export function UserList({ data, onEdit, onDelete, onCreateNew }: Props) {
    return(
        <>
            <div className="w-full mb-4 flex items-center justify-end">
                <ButtonSecondary 
                    label="Novo usuário"
                    size="w-[150px]"
                    onClick={onCreateNew}
                />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                Ações
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Código
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nome
                            </th>
                            <th scope="col" className="px-6 py-3">
                                E-mail
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Data de nascimento
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tipo de usuário
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(value => (
                            <tr key={value.uuid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                                <button onClick={() => onEdit(value.uuid)} className="bg-blue-100 hover:bg-blue-300 duration-300 rounded p-2">
                                    <Pencil size={20} color="#1e40af"/>
                                </button>
                                <button onClick={() => onDelete(value.uuid)} className="bg-red-100 hover:bg-red-300 duration-300 rounded p-2">
                                    <Trash size={20} color="#991b1b" />
                                </button>
                                </td>
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {value.uuid}
                                </td>
                                <td className="px-6 py-4">
                                    {value.name}
                                </td>
                                <td className="px-6 py-4">
                                    {value.email}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(value.birthDate!).toLocaleString('pt-BR', { timeZone: 'UTC' }).substring(0, 10)}
                                </td>
                                <td className="px-6 py-4 capitalize">
                                    {value.role}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
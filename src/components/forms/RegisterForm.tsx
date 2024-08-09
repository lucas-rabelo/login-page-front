/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useState } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Button } from '../Button';
import { ButtonGoogle } from '../ButtonGoogle';

import { RegisterFormSchema, registerFormZodSchema } from '../../schemas/RegisterFormSchema';

import { register as registerUser } from '../../services/auth.service';

type Props = {
    setChangeTypeForm: Dispatch<SetStateAction<"login" | "register" | "forget" | "reset">>;
}

export function RegisterForm({ setChangeTypeForm }: Props) {
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, handleSubmit, getValues, formState: { errors } } = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormZodSchema),
    });

    async function onSubmit(props: RegisterFormSchema) {
        setIsLoading(true);
        try {
            const data: CreateUserDto = {
                name: props.name,
                birthDate: props.birthDate,
                email: props.email,
                role: 'user',
                password: props.password
            }

            const response = await registerUser(data);
            if(response) {
                window.localStorage.setItem('token', response.access_token);
                navigate("/users")
            }
            setIsLoading(false);
        } catch(error: any) {
            setIsLoading(false);
            alert(`Ops... ${error.response.data.message}`);
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="flex flex-col items-center justify-center pb-12 pt-[300px] md:py-5 px-8 h-auto md:h-screen w-full lg:w-1/2 bg-white">
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 w-full md:w-[500px] lg:w-[450px]"
            >
                <div className="flex flex-col gap-1">
                    <h3 className="font-medium text-xl">Bem vindo</h3>
                    <h1 className="font-bold text-2xl">Crie sua conta gratuitamente!</h1>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <div className="flex flex-col gap-1 w-full">
                            <span className="font-normal text-lg">Nome</span>
                            <input 
                                className="w-full font-normal text-gray-600 bg-slate-50 p-4 rounded border-[1px] border-slate-300" 
                                type='text'
                                placeholder='Nome completo' 
                                {...register('name')}    
                            />
                            {errors?.name?.message ?
                                <span className="text-red-500">{errors?.name?.message}</span> :
                                null
                            }
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <span className="font-normal text-lg">E-mail</span>
                            <input 
                                className="w-full font-normal text-gray-600 bg-slate-50 p-4 rounded border-[1px] border-slate-300" 
                                type='email'
                                placeholder='exemplo@gmail.com' 
                                {...register('email')}    
                            />
                            {errors?.email?.message ?
                                <span className="text-red-500">{errors?.email?.message}</span> :
                                null
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <span className="font-normal text-lg">Data de nascimento</span>
                        <input 
                            className="w-full font-normal text-gray-600 bg-slate-50 p-4 rounded border-[1px] border-slate-300" 
                            type='date'
                            placeholder='12/01/1997' 
                            {...register('birthDate')}    
                        />
                        {errors?.birthDate?.message ?
                            <span className="text-red-500">{errors?.birthDate?.message}</span> :
                            null
                        }
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <div className="relative flex flex-col gap-1 w-full">
                            <span className="font-normal text-lg">Senha</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full font-normal text-gray-600 bg-slate-50 p-4 rounded border-[1px] border-slate-300" 
                                placeholder='Senha'
                                {...register('password')}    
                            />
                            <button type="button" className="absolute p-4 right-1 top-[33px]" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeSlash size={24} /> : <Eye size={24} />}
                            </button>
                            {errors?.password?.message ?
                                <span className="text-red-500">{errors?.password?.message}</span> :
                                null
                            }
                        </div>
                        <div className="relative flex flex-col gap-1 w-full">
                            <span className="font-normal text-lg">Confirme a senha</span>
                            <input
                                type={showConfirmedPassword ? "text" : "password"}
                                className="w-full font-normal text-gray-600 bg-slate-50 p-4 rounded border-[1px] border-slate-300" 
                                placeholder='Confirme a Senha'
                                {...register('passwordConfirm')}    
                            />
                            <button type="button" className="absolute p-4 right-1 top-[33px]" onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}>
                                {showConfirmedPassword ? <EyeSlash size={24} /> : <Eye size={24} />}
                            </button>
                            {errors?.passwordConfirm?.message ?
                                <span className="text-red-500">{errors?.passwordConfirm?.message}</span> :
                                null
                            }
                        </div>
                    </div>
                </div>
                <Button 
                    onClick={() => onSubmit(getValues())}
                    label="Criar conta" 
                    disabled={isLoading}
                />
            </form>
            <div className='w-full md:w-[500px] lg:w-[450px] my-4'>
                <ButtonGoogle 
                    label="Cadastro com sua conta Google"
                />
            </div>
            <div className="flex justify-center gap-1 mt-5">
                <span className="font-medium">Já tenho uma conta</span>
                <a className="cursor-pointer font-normal text-green-500" onClick={() => setChangeTypeForm("login")}>Faça login</a>
            </div>
        </div>
    );
}
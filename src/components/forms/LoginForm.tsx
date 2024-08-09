/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button } from '../Button';
import { ButtonGoogle } from '../ButtonGoogle';

import { LoginFormSchema, loginFormZodSchema } from '../../schemas/LoginFormSchema';

import { api } from '../../services/api';
import { signIn } from '../../services/auth.service';

type Props = {
    setChangeTypeForm: Dispatch<SetStateAction<"login" | "register" | "forget" | "reset">>;
}

export function LoginForm({ setChangeTypeForm }: Props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormZodSchema),
    });

    async function onSubmit({ email, password }: LoginFormSchema) {
        setIsLoading(true);
        try {
            const response = await signIn(email, password);
            if(response) {
                window.localStorage.setItem('token', response.access_token);
                navigate("/users")
            }
            setIsLoading(false);
        } catch(error: any) {
            alert(`Ops... ${error.response.data.message}`);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    async function validateToken(token: string) {
        setIsLoading(true);
        try {
            const { data } = await api.post("/auth/validate", {
                token
            });
            if(data) {
                window.localStorage.setItem('token', data.access_token);
                navigate("/users")
            } else {
                window.localStorage.removeItem('token');
            }
            setIsLoading(false);
        } catch(error) {
            console.log('Erro no login:', error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if(token) {
            validateToken(token);
        }
    }, []);

    useEffect(() => {
        if(token) {
            validateToken(token);
        }
    }, [token]);

    return(
        <div className="flex flex-col items-center justify-center py-5 px-8 h-screen w-full lg:w-1/2 bg-white">
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 w-full md:w-[500px] lg:w-[400px]"
            >
                <div className="flex flex-col gap-1">
                    <h3 className="font-medium text-xl">Bem vindo de volta</h3>
                    <h1 className="font-bold text-2xl">Faça login na sua conta</h1>
                </div>
                <div className="flex flex-col gap-6">
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
                    <div className="flex fle-row justify-between">
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                {...register('rememberMe')}
                            />
                            <label>Lembre de mim</label>
                        </div>

                        <a className="cursor-pointer font-normal text-green-500" onClick={() => setChangeTypeForm("forget")}>Esqueceu a senha?</a>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Button 
                        type='submit'
                        label="Entrar na conta" 
                        disabled={isLoading}
                    />                    
                </div>
            </form>

            <div className='w-full md:w-[500px] lg:w-[400px] my-4'>
                <ButtonGoogle />
            </div>
            <div className="flex justify-center gap-1 mt-2">
                <span className="font-medium">Não tem uma conta?</span>
                <a className="cursor-pointer font-normal text-green-500" onClick={() => setChangeTypeForm("register")}>Cadastre-se</a>
            </div>
        </div>
    );
}
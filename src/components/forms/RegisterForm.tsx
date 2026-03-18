import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "../Button";
import { ButtonGoogle } from "../ButtonGoogle";

import {
  RegisterFormSchema,
  registerFormZodSchema,
} from "../../schemas/RegisterFormSchema";

import { register as registerUser } from "../../services/auth.service";
import type { FormProps } from "../../types/form";
import type { CreateUserDto } from "../../types/user";
import { ButtonInput } from "./components/ButtonInput";
import { InputForm } from "./components/InputForm";
import { RowForm } from "./components/RowForm";

export function RegisterForm({ setChangeTypeForm }: FormProps) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmedPassword, setShowConfirmedPassword] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormZodSchema),
  });

  async function onSubmit(props: RegisterFormSchema) {
    setIsLoading(true);
    try {
      const data: CreateUserDto = {
        name: props.name,
        birthDate: props.birthDate,
        email: props.email,
        role: "user",
        password: props.password,
      };

      const response = await registerUser(data);
      if (response) {
        window.localStorage.setItem("token", response.access_token);
        navigate("/users");
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      alert(`Ops... ${error.response.data.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
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
          <RowForm>
            <InputForm
              control={control}
              name="name"
              label="Nome"
              placeholder="Nome completo"
              error={errors?.name?.message}
            />
            <InputForm
              control={control}
              name="email"
              label="E-mail"
              type="email"
              placeholder="E-mail"
              error={errors?.email?.message}
            />
          </RowForm>
          <InputForm
            control={control}
            name="birthDate"
            type="date"
            label="Data de nascimento"
            error={errors?.birthDate?.message}
          />
          <RowForm>
            <InputForm
              name="password"
              control={control}
              type={showPassword ? "text" : "password"}
              label="Senha"
              placeholder="Senha"
              error={errors?.password?.message}
              isPasswordInput
            >
              <ButtonInput
                actionValue={showPassword}
                setAction={setShowPassword}
              />
            </InputForm>
            <InputForm
              name="confirmedPassword"
              control={control}
              type={showPassword ? "text" : "password"}
              label="Confirme a senha"
              placeholder="Confirme a senha"
              error={errors?.confirmedPassword?.message}
              isPasswordInput
            >
              <ButtonInput
                actionValue={showConfirmedPassword}
                setAction={setShowConfirmedPassword}
              />
            </InputForm>
          </RowForm>
        </div>
        <Button
          onClick={() => onSubmit(getValues())}
          label="Criar conta"
          disabled={isLoading}
        />
      </form>
      <div className="w-full md:w-[500px] lg:w-[450px] my-4">
        <ButtonGoogle label="Cadastro com sua conta Google" />
      </div>
      <div className="flex justify-center gap-1 mt-5">
        <span className="font-medium">Já tenho uma conta</span>
        <a
          className="cursor-pointer font-normal text-green-500"
          onClick={() => setChangeTypeForm("login")}
        >
          Faça login
        </a>
      </div>
    </div>
  );
}

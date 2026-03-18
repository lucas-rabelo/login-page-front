import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../Button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  ResetFormSchema,
  resetFormZodSchema,
} from "../../schemas/ResetFormSchema";
import { api } from "../../services/api";
import type { FormProps } from "../../types/form";
import { ButtonInput } from "./components/ButtonInput";
import { InputForm } from "./components/InputForm";

type Props = FormProps & {
  token?: string;
};

export function ResetForm({ token, setChangeTypeForm }: Props) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmedPassword, setShowConfirmedPassword] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormSchema>({
    resolver: zodResolver(resetFormZodSchema),
  });

  async function onSubmit({ password }: ResetFormSchema) {
    setIsLoading(true);

    try {
      api.defaults.headers.authorization = `Bearer ${token}`;
      const { data } = await api.post(`/auth/reset`, {
        password,
        token,
      });

      if (data) {
        window.localStorage.setItem("token", data.access_token);
        navigate("/application");
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-5 px-8 h-screen w-full lg:w-1/2 bg-white">
      <form
        onSubmit={handleSubmit((data, event) => {
          event?.preventDefault();
          onSubmit(data);
        })}
        className="flex flex-col gap-6 w-full md:w-[500px] lg:w-[400px]"
      >
        <div className="flex flex-col gap-1">
          <h3 className="font-medium text-xl">Mudar senha</h3>
          <h1 className="font-bold text-2xl">
            Mude sua senha para poder acessar o aplicativo
          </h1>
        </div>
        <div className="flex flex-col gap-6">
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
        </div>
        <div className="flex flex-col gap-4">
          <Button type="submit" label="Enviar" disabled={isLoading} />
        </div>
      </form>
      <div className="flex justify-center gap-1 mt-10">
        <span className="font-medium">Já tenho uma conta</span>
        <a
          className="font-normal text-green-500"
          onClick={() => setChangeTypeForm("login")}
        >
          Faça login
        </a>
      </div>
    </div>
  );
}

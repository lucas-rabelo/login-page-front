import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "../../Button";
import { ButtonGoogle } from "../../ButtonGoogle";

import {
  LoginFormSchema,
  loginFormZodSchema,
} from "../../../schemas/LoginFormSchema";

import { api } from "../../../services/api";
import { signIn } from "../../../services/auth.service";
import { ButtonInput } from "../components/ButtonInput";
import { CheckboxForm } from "../components/CheckboxForm";
import { InputForm } from "../components/InputForm";

import type { LoginFormProps } from "./types";

export function LoginForm({ setChangeTypeForm }: LoginFormProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormZodSchema),
  });

  async function onSubmit({ email, password }: LoginFormSchema) {
    setIsLoading(true);
    try {
      const response = await signIn(email, password);
      if (response) {
        window.localStorage.setItem("token", response.access_token);
        navigate("/users");
      }
      setIsLoading(false);
    } catch (error: any) {
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
        token,
      });
      if (data) {
        window.localStorage.setItem("token", data.access_token);
        navigate("/users");
      } else {
        window.localStorage.removeItem("token");
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Erro no login:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      validateToken(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      validateToken(token);
    }
  }, [token]);

  return (
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
          <InputForm
            control={control}
            name="email"
            type="email"
            label="E-mail"
            error={errors?.email?.message}
          />
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
          <div className="flex fle-row justify-between">
            <CheckboxForm
              control={control}
              name="rememberMe"
              label="Lembre de mim"
            />
            <a
              className="cursor-pointer font-normal text-green-500"
              onClick={() => setChangeTypeForm("forget")}
            >
              Esqueceu a senha?
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Button type="submit" label="Entrar na conta" disabled={isLoading} />
        </div>
      </form>

      <div className="w-full md:w-[500px] lg:w-[400px] my-4">
        <ButtonGoogle />
      </div>
      <div className="flex justify-center gap-1 mt-2">
        <span className="font-medium">Não tem uma conta?</span>
        <a
          className="cursor-pointer font-normal text-green-500"
          onClick={() => setChangeTypeForm("register")}
        >
          Cadastre-se
        </a>
      </div>
    </div>
  );
}


import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../Button";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgetFormSchema,
  forgetFormZodSchema,
} from "../../schemas/ForgetFormSchema";
import { api } from "../../services/api";
import type { FormProps } from "../../types/form";
import { InputForm } from "./components/InputForm";

export function ForgetForm({ setChangeTypeForm }: FormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetFormSchema>({
    resolver: zodResolver(forgetFormZodSchema),
  });

  async function onSubmit({ email }: ForgetFormSchema) {
    setIsLoading(true);
    try {
      const { data } = await api.post("/auth/forget", {
        email,
      });
      if (data) {
        alert("Foi enviado um e-mail para você redefinir sua senha.");
      }
      //     window.localStorage.removeItem('token');
      // }
      setIsLoading(false);
    } catch (error) {
      console.log("Erro no login:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-5 px-8 h-screen w-full lg:w-1/2 bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full md:w-[500px] lg:w-[400px]"
      >
        <div className="flex flex-col gap-1">
          <h3 className="font-medium text-xl">Não se preocupe</h3>
          <h1 className="font-bold text-2xl">
            Recupere sua senha tranquilamente
          </h1>
        </div>
        <div className="flex flex-col gap-6">
          <InputForm
            control={control}
            name="email"
            label="E-mail"
            type="email"
            error={errors?.email?.message}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Button type="submit" label="Enviar" disabled={isLoading} />
        </div>
      </form>
      <div className="flex justify-center gap-1 mt-10">
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

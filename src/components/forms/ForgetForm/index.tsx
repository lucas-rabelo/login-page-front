import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../../Button";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgetFormSchema,
  forgetFormZodSchema,
} from "../../../schemas/ForgetFormSchema";
import { api } from "../../../services/api";
import { InputForm } from "../components/InputForm";

import { ContainerForm } from "../components/ContainerForm";
import { Form } from "../components/Form";
import { TitleForm } from "../components/TitleForm";
import type { ForgetFormProps } from "./types";

export function ForgetForm({ setChangeTypeForm }: ForgetFormProps) {
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
      setIsLoading(false);
    } catch (error) {
      console.log("Erro no login:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ContainerForm>
      <Form onSubmit={handleSubmit(onSubmit)} gap={6}>
        <TitleForm
          title="Recupere sua senha tranquilamente"
          subtitle="Não se preocupe"
        />
        <InputForm
          control={control}
          name="email"
          label="E-mail"
          placeholder="exemplo@gmail.com"
          type="email"
          error={errors?.email?.message}
        />
        <Button type="submit" label="Enviar" disabled={isLoading} />
      </Form>
      <span className="font-medium">
        Já tenho uma conta
        <a
          className="cursor-pointer text-green-500 ml-1 mt-10"
          onClick={() => setChangeTypeForm("login")}
        >
          Faça login
        </a>
      </span>
    </ContainerForm>
  );
}

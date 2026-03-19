import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../../Button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  ResetFormSchema,
  resetFormZodSchema,
} from "../../../schemas/ResetFormSchema";
import { api } from "../../../services/api";
import { ButtonInput } from "../components/ButtonInput";
import { InputForm } from "../components/InputForm";

import { ContainerForm } from "../components/ContainerForm";
import { Form } from "../components/Form";
import { TitleForm } from "../components/TitleForm";
import type { ResetFormProps } from "./types";

export function ResetForm({ token, setChangeTypeForm }: ResetFormProps) {
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
    <ContainerForm>
      <Form
        onSubmit={handleSubmit((data, event) => {
          event?.preventDefault();
          onSubmit(data);
        })}
        gap={6}
      >
        <TitleForm
          title="Mude sua senha para poder acessar o aplicativo"
          subtitle="Mudar senha"
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
          <ButtonInput actionValue={showPassword} setAction={setShowPassword} />
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
        <Button type="submit" label="Enviar" disabled={isLoading} />
      </Form>
      <span className="font-medium">
        Já tenho uma conta
        <a
          className="font-normal text-green-500 mt-10 ml-1"
          onClick={() => setChangeTypeForm("login")}
        >
          Faça login
        </a>
      </span>
    </ContainerForm>
  );
}

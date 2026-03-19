import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "../../Button";
import { ButtonInput } from "../components/ButtonInput";
import { Form } from "../components/Form";
import { InputForm } from "../components/InputForm";

import {
  ResetFormSchema,
  resetFormZodSchema,
} from "../../../schemas/ResetFormSchema";

import { api } from "../../../services/api";

import { TYPE_FORM } from "../../../utils/constants";

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
    <Form.Wrapper onSubmit={handleSubmit(onSubmit)} gap={6}>
      <Form.Title
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
      <Form.Footer
        setChangeTypeForm={setChangeTypeForm}
        text="Lembrou sua senha?"
        textLink="Faça login"
        formType={TYPE_FORM.LOGIN}
        marginTop={4}
      />
    </Form.Wrapper>
  );
}

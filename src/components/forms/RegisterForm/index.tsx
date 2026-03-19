import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "../../Button";

import {
  RegisterFormSchema,
  registerFormZodSchema,
} from "../../../schemas/RegisterFormSchema";

import { register as registerUser } from "../../../services/auth.service";
import type { CreateUserDto } from "../../../types/user";
import { ButtonInput } from "../components/ButtonInput";
import { InputForm } from "../components/InputForm";
import { RowForm } from "../components/RowForm";

import { API_GOOGLE_AUTH_URL, TYPE_FORM } from "../../../utils/constants";
import { ContainerForm } from "../components/ContainerForm";
import { Form } from "../components/Form";
import { TitleForm } from "../components/TitleForm";
import type { RegisterFormProps } from "./types";

export function RegisterForm({ setChangeTypeForm }: RegisterFormProps) {
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

  async function handleSignWithGoogle() {
    try {
      window.location.href = API_GOOGLE_AUTH_URL;
    } catch (error) {
      console.log("Erro no login:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

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
    <ContainerForm>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TitleForm title="Crie sua conta gratuitamente!" subtitle="Bem vindo" />
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
              placeholder="exemplo@gmail.com"
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
        <Button
          onClick={handleSignWithGoogle}
          label="Cadastro com sua conta Google"
          isGoogleButton
          variant="google"
        />
      </Form>
      <span className="font-medium">
        Já tenho uma conta
        <a
          className="cursor-pointer text-green-500 ml-1 mt-9"
          onClick={() => setChangeTypeForm(TYPE_FORM.FORGET)}
        >
          Faça login
        </a>
      </span>
    </ContainerForm>
  );
}

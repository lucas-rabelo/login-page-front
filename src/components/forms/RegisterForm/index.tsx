import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "../../Button";
import { ButtonInput } from "../components/ButtonInput";
import { InputForm } from "../components/InputForm";
import { Form } from "../components/Form";

import {
  RegisterFormSchema,
  registerFormZodSchema,
} from "../../../schemas/RegisterFormSchema";

import type { CreateUserDto } from "../../../types/user";

import { register as registerUser } from "../../../services/auth.service";

import { API_GOOGLE_AUTH_URL, TYPE_FORM } from "../../../utils/constants";

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
    <Form.Wrapper onSubmit={handleSubmit(onSubmit)} gap={4}>
      <Form.Title title="Crie sua conta gratuitamente!" subtitle="Bem vindo" />
      <Form.Row>
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
      </Form.Row>
      <InputForm
        control={control}
        name="birthDate"
        type="date"
        label="Data de nascimento"
        error={errors?.birthDate?.message}
      />
      <Form.Row>
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
      </Form.Row>
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
      <Form.Footer
        setChangeTypeForm={setChangeTypeForm}
        text="Já tem uma conta?"
        textLink="Faça login"
        formType={TYPE_FORM.LOGIN}
        marginTop={5}
      />
    </Form.Wrapper>
  );
}

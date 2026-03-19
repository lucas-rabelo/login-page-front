import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "../../Button";

import {
  LoginFormSchema,
  loginFormZodSchema,
} from "../../../schemas/LoginFormSchema";

import { api } from "../../../services/api";
import { signIn } from "../../../services/auth.service";
import { ButtonInput } from "../components/ButtonInput";
import { CheckboxForm } from "../components/CheckboxForm";
import { InputForm } from "../components/InputForm";

import { API_GOOGLE_AUTH_URL, TYPE_FORM } from "../../../utils/constants";
import { Form } from "../components/Form";
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
    <Form.Wrapper onSubmit={handleSubmit(onSubmit)} gap={6}>
      <Form.Title
        title="Faça login na sua conta"
        subtitle="Bem vindo de volta"
      />
      <InputForm
        control={control}
        name="email"
        type="email"
        placeholder="exemplo@gmail.com"
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
        <ButtonInput actionValue={showPassword} setAction={setShowPassword} />
      </InputForm>
      <div className="flex items-center justify-between">
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
      <Button type="submit" label="Entrar na conta" disabled={isLoading} />
      <Button
        onClick={handleSignWithGoogle}
        label="Ou faça login com o Google"
        isGoogleButton
        variant="google"
      />
      <Form.Footer
        setChangeTypeForm={setChangeTypeForm}
        text="Não tem uma conta?"
        textLink="Cadastre-se"
        formType={TYPE_FORM.REGISTER}
        marginTop={4}
      />
    </Form.Wrapper>
  );
}

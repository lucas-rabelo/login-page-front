import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button } from "../../Button";
import { ButtonInput } from "../components/ButtonInput";
import { InputForm } from "../components/InputForm";
import { SelectForm } from "../components/SelectForm";
import { Form } from "../components/Form";

import {
  RegisterFormSchema,
  registerFormZodSchema,
} from "../../../schemas/RegisterFormSchema";

import { queryClient } from "../../../services/query-client";

import {
  createUser,
  editUser,
  updateUser,
} from "../../../services/user.service";

import type { CreateUserDto, UpdateUserDto } from "../../../types/user";

import type { UserFormProps } from "./types";

import { ROLE_OPTIONS } from "../../../utils/constants";

export function UserForm({ userUuid, onCancel }: UserFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmedPassword, setShowConfirmedPassword] =
    useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormZodSchema),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["users", userUuid],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) return null;
      return await editUser(queryKey[1]);
    },
    enabled: !!userUuid,
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name || "");
      setValue("email", data.email || "");
      setValue("birthDate", data.birthDate || "");
      setValue("role", data.role || null);
    }
  }, [data, setValue]);

  const { mutate: createUserFn } = useMutation({
    mutationFn: async (data: CreateUserDto) => await createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const { mutate: updateUserFn } = useMutation({
    mutationFn: async (data: UpdateUserDto) => await updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  function onFinish(props: RegisterFormSchema) {
    const { confirmedPassword, ...userData } = props;
    if (userUuid) {
      updateUserFn({ ...userData, uuid: userUuid });
    } else {
      createUserFn(userData);
    }

    reset();
    onCancel();
  }

  function handleCancel(event: FormEvent) {
    event.preventDefault();

    onCancel();
  }

  return (
    <Form.Wrapper onSubmit={handleSubmit(onFinish)} gap={3}>
      <Form.Row>
        <InputForm
          name="name"
          control={control}
          error={errors?.name?.message}
          type="text"
          placeholder="Nome Completo"
          label="Nome"
        />
        <InputForm
          name="email"
          control={control}
          error={errors?.email?.message}
          type="email"
          placeholder="exemplo@gmail.com"
          label="E-mail"
        />
      </Form.Row>
      <Form.Row>
        <InputForm
          name="birthDate"
          control={control}
          error={errors?.birthDate?.message}
          type="date"
          placeholder="12/01/1997"
          label="Data de nascimento"
        />
        <SelectForm
          name="role"
          control={control}
          error={errors?.role?.message}
          label="Tipo de usuário"
          options={ROLE_OPTIONS}
        />
      </Form.Row>
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
      <div className="w-full flex justify-end mt-4">
        <div className="flex items-center gap-4 w-1/2">
          <Button
            label="Cancelar"
            textColor="black"
            padding="medium"
            onClick={handleCancel}
            disabled={isLoading}
          />
          <Button
            type="submit"
            label="Salvar"
            padding="medium"
            disabled={isLoading}
          />
        </div>
      </div>
    </Form.Wrapper>
  );
}

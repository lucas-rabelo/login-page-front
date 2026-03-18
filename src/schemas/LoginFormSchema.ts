import { z } from "zod";
import { forgetFormZodSchema } from "./ForgetFormSchema";

export const loginFormZodSchema = z.object({
    password: z.string({ required_error: "Senha incorreta" })
               .min(8, { message: "A senha tem que ter no mínimo 8 caracteres." })
               .max(32, { message: "A senha tem que ter no máximo 32 caracteres" })
               .regex(/[A-Z]/, { message: "A senha deve conter pelo menos 1 letra maiúscula" })
               .regex(/[a-z]/, { message: "A senha deve conter pelo menos 1 letra minúscula" })
               .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "A senha deve conter pelo menos 1 caracter especial" })
               .trim(),
    rememberMe: z.boolean().default(false)
}).merge(forgetFormZodSchema)

export type LoginFormSchema = z.infer<typeof loginFormZodSchema>;
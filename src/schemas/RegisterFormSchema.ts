import { z } from "zod";
import { passwordZodSchema } from './ResetFormSchema';
import { forgetFormZodSchema } from "./ForgetFormSchema";

export const registerFormZodSchema = z.object({
    name: z.string({ required_error: "Insira seu nome" })
           .min(5, { message: "Deve ter no mínimo 5 caracteres" }),
    birthDate: z.string({ required_error: "Insira uma data" }),
    role: z.string().nullable(),
}).merge(passwordZodSchema).merge(forgetFormZodSchema)
.refine(data => data.confirmedPassword === data.password, {
    message: "As senhas devem ser iguais",
    path: ["passwordConfirm"]
})

export type RegisterFormSchema = z.infer<typeof registerFormZodSchema>;
import { z } from "zod";

export const passwordZodSchema = z.object({
    password: z.string({ required_error: "Senha incorreta" })
        .min(8, { message: "A senha tem que ter no mínimo 8 caracteres." })
        .max(32, { message: "A senha tem que ter no máximo 32 caracteres" })
        .regex(/[A-Z]/, { message: "A senha deve conter pelo menos 1 letra maiúscula" })
        .regex(/[a-z]/, { message: "A senha deve conter pelo menos 1 letra minúscula" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "A senha deve conter pelo menos 1 caracter especial" })
        .trim(),
    confirmedPassword: z.string()
});

export const resetFormZodSchema = passwordZodSchema.refine(data => data.confirmedPassword === data.password, {
    message: "As senhas devem ser iguais",
    path: ["confirmedPassword"]
})

export type ResetFormSchema = z.infer<typeof resetFormZodSchema>;
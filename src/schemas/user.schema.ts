import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export const createSchema = z.object({
  nome: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  senha: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Deve conter letra maiúscula")
    .regex(/[a-z]/, "Deve conter letra minúscula")
    .regex(/[!@#$%&*]/, "Deve conter algúm caractere especial")
    .regex(/[0-9]/, "Deve conter número"),
});

export type Login = z.infer<typeof loginSchema>;
export type Create = z.infer<typeof createSchema>;

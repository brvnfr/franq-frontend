import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export type User = z.infer<typeof UserSchema>;

// DTO para registro (não precisa de ID, pois estamos populando diretamente no localstorage)
export const RegisterUserDto = UserSchema.omit({ id: true });
export type RegisterUserDto = z.infer<typeof RegisterUserDto>;

// DTO para atualização
export const UpdateUserDto = UserSchema.pick({ name: true, password: true }).partial();
export type UpdateUserDto = z.infer<typeof UpdateUserDto>;

import { useCallback } from "react";
import { LocalUserRepository } from "@/infrastructure/storage/LocalUserRepository";
import { RegisterUserUseCase } from "@/core/use-cases/RegisterUserUseCase";
import { LoginUserUseCase } from "@/core/use-cases/LoginUserUseCase";
import { LogoutUserUseCase } from "@/core/use-cases/LogoutUserUseCase";
import type { RegisterUserDto, User } from "@/core/domain/User";

// Instancia o repositório uma vez por hook
const repo = new LocalUserRepository();

/**
 * Hook que centraliza as ações do usuário:
 * - Registro de novo usuário
 * - Login de usuário existente
 * - Logout do usuário
 * 
 * Sempre usa os UseCases implementando Clean Architecture.
 */
export function useUserActions() {
  /**
   * Registra um novo usuário.
   * @param data Dados de registro do usuário
   * @returns O usuário recém-criado
   */
  const register = useCallback(async (data: RegisterUserDto): Promise<User> => {
    const useCase = new RegisterUserUseCase(repo);
    return useCase.execute(data);
  }, []);

  /**
   * Realiza o login de um usuário existente.
   * @param email E-mail do usuário
   * @param password Senha do usuário
   * @returns O usuário autenticado, ou null se falhar
   */
  const login = useCallback(async (email: string, password: string): Promise<User | null> => {
    const useCase = new LoginUserUseCase(repo);
    return useCase.execute(email, password);
  }, []);

  /**
   * Realiza logout do usuário autenticado.
   * @returns Promise resolvida ao finalizar logout
   */
  const logout = useCallback(async () => {
    const useCase = new LogoutUserUseCase(repo);
    return useCase.execute();
  }, []);

  return { register, login, logout };
}

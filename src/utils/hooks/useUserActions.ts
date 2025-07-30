import { useCallback } from "react";
import { LocalUserRepository } from "@/infrastructure/storage/LocalUserRepository";
import { RegisterUserUseCase } from "@/core/use-cases/RegisterUserUseCase";
import { LoginUserUseCase } from "@/core/use-cases/LoginUserUseCase";
import { LogoutUserUseCase } from "@/core/use-cases/LogoutUserUseCase";
import type { RegisterUserDto, User } from "@/core/domain/User";

// Instancia o repositório uma vez por hook
const repo = new LocalUserRepository();

export function useUserActions() {
  // Registro
  const register = useCallback(async (data: RegisterUserDto): Promise<User> => {
    const useCase = new RegisterUserUseCase(repo);
    return useCase.execute(data);
  }, []);

  // Login
  const login = useCallback(async (email: string, password: string): Promise<User | null> => {
    const useCase = new LoginUserUseCase(repo);
    return useCase.execute(email, password);
  }, []);

  // Logout
  const logout = useCallback(async () => {
    const useCase = new LogoutUserUseCase(repo);
    return useCase.execute();
  }, []);

  return { register, login, logout };
}

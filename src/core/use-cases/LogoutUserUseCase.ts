import type { UserRepository } from "@/core/repositories/UserRepository";

/**
 * Caso de uso para logout do usuário.
 * 
 * Esta classe encapsula a lógica de deslogar o usuário,
 * delegando a responsabilidade ao repositório de usuários.
 */
export class LogoutUserUseCase {
  private userRepository: UserRepository;

  /**
   * Cria uma instância do caso de uso de logout.
   * @param userRepository O repositório responsável pelo armazenamento dos usuários.
   */
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Executa o logout do usuário atual.
   * @returns Uma Promise que resolve quando o logout for concluído.
   */
  async execute(): Promise<void> {
    return this.userRepository.logout();
  }
}

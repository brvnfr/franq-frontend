import type { UserRepository } from "@/core/repositories/UserRepository";
import type { User } from "@/core/domain/User";

/**
 * Caso de uso para login de usuário.
 * 
 * Recebe um repositório de usuários via injeção de dependência.
 * Executa a autenticação com e-mail e senha, retornando o usuário autenticado
 * ou null em caso de falha.
 */
export class LoginUserUseCase {
  private userRepository: UserRepository;

  /**
   * @param userRepository Repositório de usuários a ser utilizado pelo caso de uso.
   */
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Realiza o login do usuário.
   * @param email E-mail do usuário.
   * @param password Senha do usuário.
   * @returns Usuário autenticado ou null se não encontrado/credenciais inválidas.
   */
  async execute(email: string, password: string): Promise<User | null> {
    return this.userRepository.login(email, password);
  }
}

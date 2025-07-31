import { RegisterUserDto, type User } from "../domain/User";
import type { UserRepository } from "@/core/repositories/UserRepository";

/**
 * Caso de uso para registrar um novo usuário.
 * 
 * Segue o padrão de Clean Architecture, recebendo o repositório por injeção de dependência.
 * 
 * @class RegisterUserUseCase
 * @constructor
 * @param {UserRepository} userRepository - Implementação do repositório de usuários
 */
export class RegisterUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Executa o registro de um novo usuário.
   * 
   * @param {RegisterUserDto} data - Dados para registro do usuário
   * @returns {Promise<User>} - Usuário criado
   */
  async execute(data: RegisterUserDto): Promise<User> {
    return this.userRepository.register(data);
  }
}

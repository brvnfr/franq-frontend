import type { UserRepository } from "@/core/repositories/UserRepository";
import type { User } from "@/core/domain/User";

export class LoginUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(email: string, password: string): Promise<User | null> {
    return this.userRepository.login(email, password);
  }
}

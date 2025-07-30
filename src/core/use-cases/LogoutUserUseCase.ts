import type { UserRepository } from "@/core/repositories/UserRepository";

export class LogoutUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(): Promise<void> {
    return this.userRepository.logout();
  }
}

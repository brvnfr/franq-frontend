import { RegisterUserDto, type User } from "../domain/User";
import type { UserRepository } from "@/core/repositories/UserRepository";

export class RegisterUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(data: RegisterUserDto): Promise<User> {
    return this.userRepository.register(data);
  }
}

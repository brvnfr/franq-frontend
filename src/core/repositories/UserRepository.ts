import type { User, RegisterUserDto, UpdateUserDto } from "../domain/User";

export interface UserRepository {
  register(data: RegisterUserDto): Promise<User>;
  login(email: string, password: string): Promise<User | null>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  updateUser(userId: string, data: UpdateUserDto): Promise<User>;
  isEmailAvailable(email: string): Promise<boolean>;
}

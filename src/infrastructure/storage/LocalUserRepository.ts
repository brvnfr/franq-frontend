import { type User, RegisterUserDto, UpdateUserDto, UserSchema } from "@/core/domain/User";
import type { UserRepository } from "@/core/repositories/UserRepository";
import { generateId } from "@/utils/helpers/generateId";

const USERS_KEY = "franq_users";
const CURRENT_KEY = "franq_current_user";

function getStoredUsers(): User[] {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export class LocalUserRepository implements UserRepository {
  async register(data: RegisterUserDto): Promise<User> {
    const users = getStoredUsers();
    if (users.some(u => u.email === data.email)) {
      throw new Error("E-mail já cadastrado");
    }
  
    const user: User = UserSchema.parse({
      ...data,
      id: generateId(),
    });
    users.push(user);
    saveUsers(users);
    localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
    return user;
  }

  async login(email: string, password: string): Promise<User | null> {
    const users = getStoredUsers();
    const found = users.find(u => u.email === email && u.password === password) || null;
    if (found) {
      localStorage.setItem(CURRENT_KEY, JSON.stringify(found));
    }
    return found;
  }

  async logout(): Promise<void> {
    localStorage.removeItem(CURRENT_KEY);
  }

  async getCurrentUser(): Promise<User | null> {
    const user = localStorage.getItem(CURRENT_KEY);
    return user ? UserSchema.parse(JSON.parse(user)) : null;
  }

  async updateUser(userId: string, data: UpdateUserDto): Promise<User> {
    const users = getStoredUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) throw new Error("Usuário não encontrado");

    users[idx] = { ...users[idx], ...data };

    const updated = UserSchema.parse(users[idx]);
    users[idx] = updated;
    saveUsers(users);
    if (localStorage.getItem(CURRENT_KEY)) {
      localStorage.setItem(CURRENT_KEY, JSON.stringify(updated));
    }
    return updated;
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    const users = getStoredUsers();
    return !users.some(u => u.email === email);
  }
}

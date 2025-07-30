import { createContext } from "react";
import type { User, RegisterUserDto } from "@/core/domain/User";

export interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  register: (data: RegisterUserDto) => Promise<User>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

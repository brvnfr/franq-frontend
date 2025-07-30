import React, { useEffect, useState } from "react";
import type { User, RegisterUserDto } from "@/core/domain/User";
import { LocalUserRepository } from "@/infrastructure/storage/LocalUserRepository";
import { AuthContext } from "./auth-context";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const repo = new LocalUserRepository();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const currentUser = await repo.getCurrentUser();
        setUser(currentUser);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const loggedUser = await repo.login(email, password);
    setUser(loggedUser);
    return loggedUser;
  };

  const register = async (data: RegisterUserDto) => {
    const newUser = await repo.register(data);
    setUser(newUser);
    return newUser;
  };

  const logout = async () => {
    await repo.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

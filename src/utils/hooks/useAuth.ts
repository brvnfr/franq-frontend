import { useContext } from "react";
import { AuthContext } from "@/app/providers/auth-context";

/**
 * Hook para acessar o contexto de autenticação do usuário.
 *
 * Fornece acesso ao usuário atual (`user`), status de carregamento (`loading`)
 * e métodos de autenticação: `login`, `register` e `logout`.
 *
 * @returns O contexto de autenticação.
 * @throws Se usado fora do AuthProvider.
 *
 * @example
 * const { user, login, logout, register, loading } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}

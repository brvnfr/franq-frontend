import { useContext } from "react";
import { ThemeContext } from "@/app/providers/theme-context";

/**
 * Hook para acessar o contexto do tema (light/dark).
 *
 * @returns Objeto contendo o tema atual (`theme`), função para definir (`setTheme`) e alternar (`toggleTheme`) o tema.
 * @throws Se usado fora do ThemeProvider.
 *
 * @example
 * const { theme, setTheme, toggleTheme } = useTheme();
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme deve ser usado dentro de ThemeProvider");
  return context;
}

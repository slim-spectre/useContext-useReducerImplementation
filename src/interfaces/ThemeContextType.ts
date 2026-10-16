import type { ThemeType } from "../types/ThemeType";

export interface ThemeContextType {
  theme : ThemeType,
  toggleTheme : () => void,
}
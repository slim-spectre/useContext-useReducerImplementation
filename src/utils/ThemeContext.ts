import { createContext } from "react";
import type { ThemeContextType } from "../interfaces/ThemeContextType";

export const ThemeContext = createContext<ThemeContextType>({
  theme : 'light',
  toggleTheme : () => {},
})
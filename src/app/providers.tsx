"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/store";
import { TooltipProvider } from "@/components/ui/tooltip";
import { type ThemeProviderProps } from "next-themes";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <Provider store={store}>
      <NextThemesProvider {...props}>
        <TooltipProvider delay={0}>{children}</TooltipProvider>
      </NextThemesProvider>
    </Provider>
  );
}

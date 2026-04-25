'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { type ThemeProviderProps } from 'next-themes';

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <Provider store={store}>
      <NextThemesProvider {...props}>
        {children}
      </NextThemesProvider>
    </Provider>
  );
}

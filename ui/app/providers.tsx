'use client';

import { ThemeProvider } from '@mui/material';
import darkTheme from './dark.theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ReactElement } from 'react';
import { AuthContext } from './auth/auth-context';

interface ProviderProps {
  children: ReactElement[];
  isAuthenticated: boolean;
}

export default function Providers({
  children,
  isAuthenticated,
}: ProviderProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={darkTheme}>
        <AuthContext.Provider value={isAuthenticated}>
          {children}
        </AuthContext.Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

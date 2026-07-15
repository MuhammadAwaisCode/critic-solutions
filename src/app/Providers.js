'use client';
import { ThemeProvider } from './context/ThemeContext';
import { LangProvider } from './context/LangContext';

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <LangProvider>
        {children}
      </LangProvider>
    </ThemeProvider>
  );
}

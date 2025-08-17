import { useTheme } from '../contexts/ThemeContext';

export const useThemeColors = () => {
  const { resolvedTheme } = useTheme();
  
  const isDark = resolvedTheme === 'dark';
  
  return {
    isDark,
    colors: {
      bg: {
        primary: isDark ? '#0f172a' : '#ffffff',
        secondary: isDark ? '#1e293b' : '#f8fafc',
        tertiary: isDark ? '#334155' : '#f1f5f9',
        card: isDark ? '#1e293b' : '#ffffff',
        input: isDark ? '#334155' : '#ffffff',
      },
      text: {
        primary: isDark ? '#f8fafc' : '#1e293b',
        secondary: isDark ? '#e2e8f0' : '#475569',
        tertiary: isDark ? '#cbd5e1' : '#64748b',
        muted: isDark ? '#94a3b8' : '#94a3b8',
        inverse: isDark ? '#0f172a' : '#ffffff',
      },
      border: {
        primary: isDark ? '#334155' : '#e2e8f0',
        secondary: isDark ? '#475569' : '#cbd5e1',
        focus: isDark ? '#60a5fa' : '#3b82f6',
      },
      accent: {
        primary: isDark ? '#60a5fa' : '#3b82f6',
        secondary: isDark ? '#a78bfa' : '#8b5cf6',
        success: isDark ? '#34d399' : '#10b981',
        warning: isDark ? '#fbbf24' : '#f59e0b',
        error: isDark ? '#f87171' : '#ef4444',
      }
    }
  };
};

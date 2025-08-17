import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
  const { theme, toggleTheme, resolvedTheme } = useTheme();

  const getIcon = () => {
    if (theme === 'light') return <SunIcon className="w-5 h-5" />;
    if (theme === 'dark') return <MoonIcon className="w-5 h-5" />;
    return <ComputerDesktopIcon className="w-5 h-5" />;
  };

  const getTooltip = () => {
    if (theme === 'light') return 'Switch to dark mode';
    if (theme === 'dark') return 'Switch to system preference';
    return 'Switch to light mode';
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-secondary hover:bg-tertiary transition-colors duration-200"
      title={getTooltip()}
      aria-label={getTooltip()}
    >
      {getIcon()}
    </button>
  );
};

export default ThemeToggle;

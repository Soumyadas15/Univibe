import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

function useDarkMode() {
  const { resolvedTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(resolvedTheme === 'light');

  useEffect(() => {
    setIsDarkMode(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  return isDarkMode;
}

export default useDarkMode;

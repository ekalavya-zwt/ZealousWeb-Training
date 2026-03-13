import useThemeStore from "../stores/themeStore";

const useTheme = () => {
  const mode = useThemeStore((state) => state.mode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return { mode, toggleTheme };
};

export default useTheme;

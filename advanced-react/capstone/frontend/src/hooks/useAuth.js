import useAuthStore from "../stores/authStore";

const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return { user, login, logout, isAuthenticated };
};

export default useAuth;

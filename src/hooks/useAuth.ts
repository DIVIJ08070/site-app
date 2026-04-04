import { useAuthStore } from '../store/authStore';
import { AuthContextType } from '../types/auth';

export const useAuth = (): AuthContextType => {
  const store = useAuthStore();
  return store;
};

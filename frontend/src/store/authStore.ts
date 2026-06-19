import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authService } from '../services/authService';

interface User {
    id: number;
    nombre: string;
    email: string;
    nivel: 'Administrador' | 'Tecnico' | 'Supervisor';
    apiKey?: string;
    ultimoAcceso?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    setUser: (user: User) => void;
    clearError: () => void;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
          (set, get) => ({
                  user: null,
                  token: null,
                  isAuthenticated: false,
                  isLoading: false,
                  error: null,

                  login: async (email: string, password: string) => {
                            set({ isLoading: true, error: null });
                            try {
                                        const response = await authService.login(email, password);
                                        set({
                                                      user: response.user,
                                                      token: response.token,
                                                      isAuthenticated: true,
                                                      isLoading: false,
                                        });
                                        // Configurar token en axios
                              authService.setAuthToken(response.token);
                            } catch (error: any) {
                                        set({
                                                      isLoading: false,
                                                      error: error.response?.data?.error || 'Error al iniciar sesion',
                                                      isAuthenticated: false,
                                        });
                                        throw error;
                            }
                  },

                  logout: () => {
                            authService.logout();
                            set({
                                        user: null,
                                        token: null,
                                        isAuthenticated: false,
                                        error: null,
                            });
                  },

                  setUser: (user: User) => {
                            set({ user });
                  },

                  clearError: () => {
                            set({ error: null });
                  },

                  checkAuth: async () => {
                            const { token } = get();
                            if (!token) {
                                        set({ isAuthenticated: false });
                                        return;
                            }
                            try {
                                        authService.setAuthToken(token);
                                        const user = await authService.me();
                                        set({ user, isAuthenticated: true });
                            } catch {
                                        set({ user: null, token: null, isAuthenticated: false });
                            }
                  },
          }),
      {
              name: 'wisphub-auth',
              storage: createJSONStorage(() => localStorage),
              partialize: (state) => ({
                        user: state.user,
                        token: state.token,
                        isAuthenticated: state.isAuthenticated,
              }),
      }
        )
  );

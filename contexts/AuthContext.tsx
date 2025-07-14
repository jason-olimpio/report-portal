import {createContext, ReactNode, useEffect, useState} from 'react';

import {AuthUser} from '@types';
import {
  getToken,
  isTokenValid,
  getTokenPayload,
  removeToken,
  saveToken,
} from '@utils';

export type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: AuthUser, token: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    setIsLoading(true);

    try {
      const token = await getToken();

      if (!token) {
        setUser(null);
        return;
      }

      if (!isTokenValid(token)) {
        await removeToken();
        setUser(null);

        return;
      }

      const payload = getTokenPayload(token);

      if (!payload) {
        console.warn('Token is valid but payload could not be extracted');

        await removeToken();
        setUser(null);

        return;
      }

      setUser({
        id: payload.userId,
        email: payload.email,
        name: '',
      });
    } catch (error) {
      console.error('Error checking auth state:', error);

      setUser(null);

      try {
        await removeToken();
      } catch (cleanupError) {
        console.error('Error cleaning up token:', cleanupError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (authUser: AuthUser, token: string) => {
    try {
      await saveToken(token);

      setUser(authUser);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = async () => {
    try {
      await removeToken();

      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

'use client';

import React from 'react';
import { destroyCookie, setCookie } from 'nookies';
import { LoginAuthenticated, UserContextProps, UserProviderProps } from './interface';
import useFetch from '@/hooks/useFetch/hook';
import { LoginSchemaType } from '@/schemas/loginSchema';
import { useRouter } from 'next/navigation';
import { User } from '@/interfaces/User/User';
import { initialUser } from '@/data/initialUser';

const UserContext = React.createContext<UserContextProps>({
  isAuthenticated: false,
  isLoadingLogin: true,
  // isLoadingPages: true,
  login: async () => ({}) as LoginAuthenticated,
  logout: async () => {},
  user: {} as User,
});

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [requestLogin, isLoadingLogin] = useFetch<LoginAuthenticated>();
  // const [isLoadingPages, setLoadingPages] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<User>(initialUser());

  const router = useRouter();
  const isAuthenticated = !!user?.id;

  const handleSetCookies = (token: string) => {
    setCookie(undefined, 'token', token, { path: '/' });
  };

  const handleUserState = (data: LoginAuthenticated) => {
    const { user, token } = data;
    setUser(user);
    handleSetCookies(token);
  };

  const login = async (formData: LoginSchemaType) => {
    const { data } = await requestLogin('/auth/login', {
      method: 'POST',
      body: formData,
    });

    handleUserState(data);

    return data;
  };

  const logout = async () => {
    clearSession();
    router.push('/');
  };

  const clearSession = () => {
    destroyCookie(undefined, 'token', { path: '/' });
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, isLoadingLogin, login, logout, user }}>
      {children}
    </UserContext.Provider>
  );
};

function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, useUser };

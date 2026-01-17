"use client";

import React from "react";
import { destroyCookie, setCookie } from "nookies";
import { UserContextProps, UserProviderProps } from "./interface";
import useFetch from "@/hooks/useFetch/hook";
import { LoginSchemaType } from "@/schemas/loginSchema";
import { useRouter } from "next/navigation";
import { User } from "@/interfaces/User/User";
import { initialUser } from "@/data/initialUser";
import { toaster } from "@/components/ui/toaster";
import { Insight } from "@/interfaces/Insight";

const UserContext = React.createContext<UserContextProps>({
  isAuthenticated: false,
  isLoadingLogin: true,
  isLoadingPages: true,
  isLoadingInsight: true,
  isLoadingValidateToken: true,
  login: async () => ({}) as User,
  logout: async () => {},
  handleValidateToken: async () => {},
  user: {} as User,
  insight: {} as Insight,
});

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [requestLogin, isLoadingLogin] = useFetch<User>();
  const [requestValidateToken, isLoadingValidateToken] = useFetch<User>();
  const [requestInsight, isLoadingInsight] = useFetch<Insight>();
  const [isLoadingPages, setLoadingPages] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<User>(initialUser());
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [insight, setInsight] = React.useState<Insight>({} as Insight);

  const router = useRouter();

  const handleSetCookies = (token: string) => {
    setCookie(undefined, "token", token, { path: "/" });
  };

  const handleUserState = (data: User) => {
    setUser(data);
    handleSetCookies(data.token_access.token);
  };

  const login = async (formData: LoginSchemaType) => {
    const resp = await requestLogin("/api/auth/login", {
      method: "POST",
      body: formData,
    }).catch(({ message }) => {
      toaster.create({
        description: message,
        type: "error",
        closable: true,
      });
    });

    if (resp && resp.data) {
      handleUserState(resp.data);
      setIsAuthenticated(true);
    }
    return resp?.data as User;
  };

  const handleValidateToken = async () => {
    const resp = await requestValidateToken(`/api/auth/active`, {
      method: "GET",
    })
      .catch(() => {
        clearSession();
      })
      .finally(() => {
        setLoadingPages(false);
      });

    if (resp && resp.message === "Token ativo") {
      setIsAuthenticated(true);
      setUser({ ...resp.data });
    }
  };

  const handleInsightData = async () => {
    const resp = await requestInsight(`/api/admin/insights`, {
      method: "GET",
    });

    if (resp && resp.data) {
      setInsight({ ...resp.data });
    }
  };

  const logout = async () => {
    clearSession();
    router.push("/");
  };

  const clearSession = () => {
    destroyCookie(undefined, "token", { path: "/" });
    setIsAuthenticated(false);
  };

  React.useEffect(() => {
    handleValidateToken();
    handleInsightData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoadingPages,
        isAuthenticated,
        isLoadingLogin,
        isLoadingInsight,
        isLoadingValidateToken,
        login,
        logout,
        user,
        insight,
        handleValidateToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };

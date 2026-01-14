import { Insight } from "@/interfaces/Insight";
import { User } from "@/interfaces/User/User";
import { LoginSchemaType } from "@/schemas/loginSchema";

export interface UserContextProps {
  login: (params: LoginSchemaType) => Promise<User>;
  logout: () => Promise<void>;
  handleValidateToken: () => Promise<void>;
  isLoadingLogin: boolean;
  isAuthenticated: boolean;
  isLoadingPages: boolean;
  isLoadingInsight: boolean;
  user: User;
  insight: Insight;
}

export interface UserProviderProps {
  children: React.ReactNode;
}

export interface LoginAuthenticated {
  token: string;
  user: User;
}

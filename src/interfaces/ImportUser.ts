import { UserRole } from "@/interfaces/User/User";

export interface ImportUserPayload {
  nome: string;
  email: string;
  role: UserRole;
  password?: string;
}

export interface ImportUsersBody {
  users: ImportUserPayload[];
}

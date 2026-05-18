export type UserRole = "operator" | "support" | "admin";

export interface User {
  id: number;
  nome: string;
  email: string;
  role: UserRole;
  token: string;
}

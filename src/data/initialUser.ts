import { User } from "@/interfaces/User/User";

export function initialUser(): User {
  return {
    id: 0,
    nome: "",
    email: "",
    role: "operator",
    token: "",
  };
}

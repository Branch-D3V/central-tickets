export interface Ticket {
  id: number;
  name: string;
  created_at: string;
  description: string;
  type: string;
  priority: string;
  status: "aberto" | "pendente" | "resolvido";
}

import { Ticket } from "@/interfaces/Ticket";

const tickets: Array<Ticket> = [
  {
    id: 1,
    title: "Erro no cadastro",
    created_at: "2024-06-10T12:00:00Z",
    description: "Erro ao cadastrar na plataforma.",
    type: "technical",
    priority: "high",
    status: "open",
  },
  {
    id: 2,
    title: "Erro de acesso",
    created_at: "2024-06-10T12:00:00Z",
    description: "Erro ao acessar o sistema.",
    type: "technical",
    priority: "low",
    status: "closed",
  },
  {
    id: 3,
    title: "Erro no boleto",
    created_at: "2024-06-10T12:00:00Z",
    description: "Erro ao processar boleto.",
    type: "financial",
    priority: "medium",
    status: "waiting_operator",
  },
];

export { tickets };

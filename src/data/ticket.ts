import { Ticket } from "@/interfaces/Ticket";

const tickets: Array<Ticket> = [
  {
    id: 1,
    name: "Erro Cadastro",
    created_at: "2024-06-10T12:00:00Z",
    description: "Erro ao cadastrar na plataforma.",
    type: "bug",
    priority: "alta",
    status: "aberto",
  },
  {
    id: 2,
    name: "Erro Acesso",
    created_at: "2024-06-10T12:00:00Z",
    description: "Erro ao acessar o sistema.",
    type: "bug",
    priority: "baixa",
    status: "resolvido",
  },
  {
    id: 3,
    name: "Erro boleto",
    created_at: "2024-06-10T12:00:00Z",
    description: "Erro ao processar boleto.",
    type: "bug",
    priority: "média",
    status: "pendente",
  },
];

export { tickets };

import * as yup from "yup";

export const createTicketSchema = yup.object({
  title: yup
    .string()
    .min(3, "Mínimo de 3 caracteres")
    .max(120, "Máximo de 120 caracteres")
    .required("Informe um título"),
  description: yup
    .string()
    .min(10, "Descreva com pelo menos 10 caracteres")
    .required("Descrição obrigatória"),
  type: yup
    .string()
    .oneOf(
      ["technical", "financial", "operational", "improvement"],
      "Tipo inválido"
    )
    .required("Selecione um tipo"),
  priority: yup
    .string()
    .oneOf(["high", "medium", "low"], "Prioridade inválida")
    .required("Selecione a prioridade"),
  due_at: yup.string().nullable().optional(),
});

export type CreateTicketSchemaType = yup.InferType<typeof createTicketSchema>;

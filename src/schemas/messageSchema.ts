import * as yup from "yup";

export const sendMessageSchema = yup.object({
  body: yup
    .string()
    .trim()
    .min(1, "Escreva uma mensagem")
    .required("Escreva uma mensagem"),
  internal: yup.boolean().optional(),
});

export type SendMessageSchemaType = yup.InferType<typeof sendMessageSchema>;

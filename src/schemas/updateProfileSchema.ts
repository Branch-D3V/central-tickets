import * as yup from "yup";

export const updateProfileSchema = yup.object({
  email: yup.string().email("E-mail inválido"),
  nome: yup.string(),
  cpf: yup.string(),
});

export type UpdateProfileSchemaType = yup.InferType<typeof updateProfileSchema>;

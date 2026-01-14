import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  senha: yup.string().min(4).max(20).required(),
});

export type LoginSchemaType = yup.InferType<typeof loginSchema>;

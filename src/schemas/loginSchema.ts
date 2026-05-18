import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("E-mail inválido").required("Informe seu e-mail"),
  password: yup
    .string()
    .min(6, "A senha deve ter ao menos 6 caracteres")
    .required("Informe sua senha"),
});

export type LoginSchemaType = yup.InferType<typeof loginSchema>;

import * as yup from "yup";

export const updatePasswordSchema = yup.object({
  senha_antiga: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(20, "A senha deve ter no máximo 20 caracteres")
    .required("Senha atual é obrigatória"),
  senha_nova: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(20, "A senha deve ter no máximo 20 caracteres")
    .required("Nova senha é obrigatória"),
  senha_comp: yup
    .string()
    .oneOf([yup.ref("senha_nova")], "As senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
});

export type UpdatePasswordSchemaType = yup.InferType<
  typeof updatePasswordSchema
>;

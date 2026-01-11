import * as yup from "yup";

export const recoverySchema = yup.object({
  email: yup.string().email().required(),
});

export type RecoverySchemaType = yup.InferType<typeof recoverySchema>;
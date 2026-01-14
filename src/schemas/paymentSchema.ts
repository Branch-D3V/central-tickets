import * as yup from "yup";

export const paymentSchema = yup.object({
  paymentMethod: yup
    .mixed<"pix" | "credit_card" | "boleto">()
    .oneOf(["pix", "credit_card", "boleto"])
    .required(),
  currency: yup.string().default("BRL"),
  card: yup
    .object({
      number: yup.string().required("Número obrigatório"),
      cvv: yup.string().required("CVV obrigatório"),
      holderName: yup.string().required("Nome obrigatório"),
      expirationMonth: yup.number().required(),
      expirationYear: yup.number().required(),
    })
    .when("paymentMethod", {
      is: "credit_card",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.strip(),
    }),
  pix: yup
    .object({
      expiresInDays: yup.number().min(1),
    })
    .when("paymentMethod", {
      is: "pix",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.strip(),
    }),
  boleto: yup
    .object({
      expiresInDays: yup.number().min(1),
    })
    .when("paymentMethod", {
      is: "boleto",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.strip(),
    }),
  plano_id: yup.number().required(),
});

export type PaymentSchemaType = yup.InferType<typeof paymentSchema>;

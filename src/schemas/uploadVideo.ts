import * as yup from "yup";

export const videoUploadSchema = yup.object({
  titulo: yup.string().required("Título é obrigatório"),

  descricao: yup.string().optional().nullable(),

  arquivo: yup
    .mixed<File>()
    .required("Arquivo principal é obrigatório")
    .test("fileRequired", "Arquivo inválido", (value) => value instanceof File),

  arquivo_capa: yup
    .mixed<File>()
    .test(
      "fileType",
      "Capa inválida",
      (value) => !value || value instanceof File
    ),

  eh_premium: yup.boolean().default(false),

  privado: yup.boolean().default(false),

  lancado: yup.boolean().default(true),
});

export type VideoUploadSchemaType = yup.InferType<typeof videoUploadSchema>;

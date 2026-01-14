export interface CustomerDocument {
  type: "cpf" | "cnpj";
  number: string;
}
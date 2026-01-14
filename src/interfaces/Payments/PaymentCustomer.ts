import { CustomerDocument } from "./CustomerDocument";

export interface PaymentCustomer {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthdate: string | null;
  createdAt: string;
  externalRef: string | null;
  document: CustomerDocument;
  address: unknown | null;
}
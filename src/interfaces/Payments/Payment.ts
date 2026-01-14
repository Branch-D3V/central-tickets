export interface Payment {
  paymentMethod: "pix" | "credit_card" | "boleto";
  installments?: number;
  plano_id: number;

  card?: {
    hash: string;
    number?: string;
    holderName?: string;
    expirationMonth?: number;
    expirationYear?: number;
    cvv?: string;
    sessionId?: string;
  };

  pix?: {
    expiresInDays: number;
  };

  boleto?: {
    expiresInDays: number;
  };
}

export type PaymentMethod = "pix" | "boleto" | "credit_card";

export type PaymentStatus =
  | "waiting_payment"
  | "paid"
  | "refunded"
  | "canceled"
  | "refused";

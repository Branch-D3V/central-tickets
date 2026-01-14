import { BoletoPayment } from "./Boleto";
import { CardPayment } from "./Card";
import { PaymentMethod, PaymentStatus } from "./Payment";
import { PaymentCustomer } from "./PaymentCustomer";
import { PaymentFee } from "./PaymentFee";
import { PixPayment } from "./Pix";
import { PaymentSplit } from "./Split";

export interface PaymentResponse {
  id: number;
  tenantId: string;
  companyId: number;

  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  installments: number;

  paidAt: string | null;
  paidAmount: number;
  refundedAt: string | null;
  refundedAmount: number;

  redirectUrl: string | null;
  returnUrl: string | null;
  postbackUrl: string | null;

  metadata: unknown | null;
  ip: string | null;

  externalRef: string;
  secureId: string;
  secureUrl: string;

  createdAt: string;
  updatedAt: string;

  payer: unknown | null;
  traceable: boolean;
  authorizationCode: string | null;

  basePrice: number | null;
  interestRate: number | null;

  items: PaymentItem[];
  customer: PaymentCustomer;

  fee: PaymentFee;
  splits: PaymentSplit[];
  refunds: unknown[];

  pix: PixPayment | null;
  boleto: BoletoPayment | null;
  card: CardPayment | null;

  refusedReason: string | null;

  shipping: unknown | null;
  delivery: unknown | null;
  threeDS: unknown | null;
}

export interface PaymentSplit {
  amount: number;
  netAmount: number;
  recipientId: number;
  chargeProcessingFee: boolean;
}
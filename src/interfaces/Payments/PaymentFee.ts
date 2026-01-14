export interface PaymentFee {
  netAmount: number;
  estimatedFee: number;
  fixedAmount: number;
  spreadPercent: number;
  currency: string;
}

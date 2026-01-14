export interface PixPayment {
  qrcode: string;
  end2EndId: string | null;
  receiptUrl: string | null;
  expirationDate: string;
}
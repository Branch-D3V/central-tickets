export interface PixPaymentSaints {
  response: {
    mensagem: string;
    qrcode: {
      emv: string;
      imagem: string | null;
    };
    sucesso: boolean;
    txId: string;
  };
  status: string;
  transacao_uuid: string;
  valor: number;
}

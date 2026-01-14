declare global {
  interface Window {
    Marchabb: {
      setPublicKey: (key: string) => Promise<void>;
      encrypt: (card: {
        number: string;
        holderName: string;
        expMonth: number;
        expYear: number;
        cvv: string;
      }) => Promise<string>;
    };
  }
}

export {};

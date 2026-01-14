export function safeNumber(value: string | number): number {
  const numberValue = parseFloat(String(value));
  return isNaN(numberValue) ? 0 : numberValue / 100;
}

export function formatMoney(
  amount: number | string = 0,
  decimalDigits = 2,
  currencySymbol = true,
  onlyDecimals = false
): string {
  const parsedAmount = safeNumber(amount);

  const formatted = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: decimalDigits,
  }).format(parsedAmount);

  if (onlyDecimals) {
    const [, decimal] = formatted.split(",");
    return decimal ? decimal.padEnd(decimalDigits, "0") : "00";
  }

  if (!currencySymbol) {
    return formatted.replace(/[^0-9.,]/g, "");
  }

  return formatted;
}

export function formatCpfCnpj(type: "cpf" | "cnpj", value: string): string {
  if (type === "cpf") {
    value = value.replace(/[^\d]/g, "");

    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  if (type === "cnpj") {
    return value.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  }

  return value;
}

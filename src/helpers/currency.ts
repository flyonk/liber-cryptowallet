export const getSymbolByCode = (code: string): string => {
  switch (code) {
    case 'EUR' || 'eur':
      return '€';
    case 'USD' || 'usd':
      return '$';
    case 'USDT' || 'usdt':
      return '₮';
    default:
      return '€';
  }
};

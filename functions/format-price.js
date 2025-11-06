const currencyLocales = [
  { currency: "INR", locale: "en-IN" },
  { currency: "USD", locale: "en-US" },
  { currency: "EUR", locale: "de-DE" },
];

export const formatPrice = (price, currency) => {
  const currencyLocale = currencyLocales.find(
    (item) => item.currency === currency
  );
  const locale = currencyLocale ? currencyLocale.locale : "en-IN";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(price);
};

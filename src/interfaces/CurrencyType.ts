export type CurrencyTypeFunction<T> = (
  text?: string | number | React.ReactText[],
  record?: T,
  index?: number
) => string;

export type CurrencyType<T> = CurrencyTypeFunction<T> | string;

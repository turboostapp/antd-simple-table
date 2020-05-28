export type CurrencyTypeFunction<T> = (
  value?: any,
  record?: T,
  index?: number
) => string;

export type CurrencyType<T> = CurrencyTypeFunction<T> | string;

export type CurrencyTypeFunction<T> = (
  value?: string | number | boolean | React.ReactText[],
  record?: T,
  index?: number
) => string;

export type CurrencyType<T> = CurrencyTypeFunction<T> | string;

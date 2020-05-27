import { ValueType } from "../enums/ValueType";
import { CurrencyType } from "./CurrencyType";
export interface BaseValueObjectType {
  type: ValueType;
}

export interface PercentValueObjectType {
  type: ValueType.PERCENT;
  showSymbol?: boolean;
  precision?: number;
  useGrouping?: boolean;
}

export interface NumberValueObjectType {
  type: ValueType.NUMBER;
  useGrouping?: boolean;
  precision?: number;
}

export interface MoneyValueObjectType<T> {
  type: ValueType.MONEY;
  currency: CurrencyType<T>;
  useGrouping?: boolean;
}

export interface TagValueObjectType<T> {
  type: ValueType.TAG;
  onClick?: (
    tag: [string, number],
    value: string | number | React.ReactText[],
    record: T,
    index: number
  ) => void;
}

export type ValueObjectType<T> =
  | NumberValueObjectType
  | PercentValueObjectType
  | BaseValueObjectType
  | MoneyValueObjectType<T>
  | TagValueObjectType<T>;

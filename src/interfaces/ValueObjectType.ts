import { SwitchSize } from "antd/lib/switch";

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

export interface SwitchValueObjectType<T> {
  type: ValueType.SWITCH;
  onChange?: (value: boolean, record?: T, index?: number) => void;
  loading?: boolean;
  size?: SwitchSize;
  disabled?: boolean;
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
    value: any,
    record: T,
    index: number
  ) => void;
}

export type ValueObjectType<T> =
  | NumberValueObjectType
  | PercentValueObjectType
  | BaseValueObjectType
  | MoneyValueObjectType<T>
  | TagValueObjectType<T>
  | SwitchValueObjectType<T>;

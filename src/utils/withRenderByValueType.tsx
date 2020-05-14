/* eslint-disable no-param-reassign */
import { get } from "lodash";
import { ReactNode } from "react";

import { ValueType } from "../enums/ValueType";
import { SimpleColumnType } from "../interfaces/SimpleColumnType";
import { ValueObjectType } from "../interfaces/ValueObjectType";
import { ValueTypeFunction } from "../interfaces/ValueTypeFunction";
import renderText from "./renderText";

const getAlign = <T, U>(
  valueType: ValueType | ValueTypeFunction<T> | ValueObjectType<T>
): boolean => {
  if (typeof valueType === "function") {
    const value = valueType();
    if (typeof value === "string") {
      return getAlign(value as ValueType);
    }
    if (typeof value === "object") {
      return getAlign(get(valueType, "type", ValueType.TEXT));
    }
  }
  if (typeof valueType === "object") {
    return getAlign(get(valueType, "type", ValueType.TEXT));
  }
  if (typeof valueType === "string") {
    switch (valueType) {
      case ValueType.MONEY:
        return true;
      case ValueType.PERCENT:
        return true;
      case ValueType.NUMBER:
        return true;
      default:
        return false;
    }
  }
  return false;
};

export default function withRenderByValueType<T>(
  columns: SimpleColumnType<T>[]
): SimpleColumnType<T>[] {
  return columns.map(
    (column): SimpleColumnType<T> => {
      delete column.filters;
      if (column.valueType) {
        return {
          align: getAlign(column.valueType) ? "right" : "center",
          ...column,
          sorter: false,
          render: (text, record, index): ReactNode => {
            return renderText(text, column.valueType, index, record);
          },
        };
      }
      return { ...column, sorter: false };
    }
  );
}

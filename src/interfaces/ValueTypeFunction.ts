import { ValueType } from "../enums/ValueType";
import { ValueObjectType } from "./ValueObjectType";

/**
 * value type by function
 */
export type ValueTypeFunction<T> = (
  text?: string | number | React.ReactText[],
  record?: T,
  index?: number
) => ValueType | ValueObjectType<T>;

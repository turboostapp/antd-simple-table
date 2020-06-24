import { ColumnType } from "antd/lib/table";
import { Key } from "react";

import { ValueType } from "../enums/ValueType";
import { PositionType } from "../interfaces/PositionType";
import { ValueObjectType } from "./ValueObjectType";
import { ValueTypeFunction } from "./ValueTypeFunction";

export interface SimpleColumnType<T> extends ColumnType<T> {
  copyable?: boolean;
  ellipsis?: boolean;
  hidden?: boolean;
  key: Key;
  valueType?: ValueType | ValueTypeFunction<T> | ValueObjectType<T>;
  width?: number;
  fixed?: PositionType;
}

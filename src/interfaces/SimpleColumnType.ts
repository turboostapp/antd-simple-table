import { ColumnType } from "antd/lib/table";
import { Key } from "react";

import { FilterType } from "../enums/FilterType";
import { ValueType } from "../enums/ValueType";
import { ValueObjectType } from "./ValueObjectType";
import { ValueTypeFunction } from "./ValueTypeFunction";

export interface SimpleColumnType<T> extends ColumnType<T> {
  copyable?: boolean;
  ellipsis?: boolean;
  hidden?: boolean;
  key: Key;
  filterType?: FilterType;
  valueType?: ValueType | ValueTypeFunction<T> | ValueObjectType<T>;
  width?: number;
}

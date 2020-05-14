import { ReactNode } from "react";

import { ColumnSetting } from "../dto/ColumnSetting";
import { TableSize } from "../enums/TableSize";
import { SimpleColumnType } from "./SimpleColumnType";
import { ToolBarOptions } from "./ToolBarOptions";

export interface ToolBarProps<T> {
  columns: SimpleColumnType<T>[];
  columnSettings: ColumnSetting[];
  options?: ToolBarOptions;
  size?: TableSize;
  toolBarRender?: () => ReactNode[];
  onColumnSettingsChange: (columnSettings: ColumnSetting[]) => void;
  onDownload?: () => void;
  onRefresh?: () => void;
  onSizeChange: (size: TableSize) => void;
}

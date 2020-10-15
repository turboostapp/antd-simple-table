import { ReactNode } from "react";

import { TableSize } from "../enums/TableSize";
import { ColumnSettingType } from "./ColumnSettingType";
import { SimpleColumnType } from "./SimpleColumnType";
import { ToolBarOptions } from "./ToolBarOptions";

export interface ToolBarProps<T> {
  columns: SimpleColumnType<T>[];
  columnSettings: ColumnSettingType[];
  options?: ToolBarOptions | false;
  size?: TableSize;
  toolBarRender?: () => ReactNode[];
  onColumnSettingsChange: (columnSettings: ColumnSettingType[]) => void;
  onDownload?: () => void;
  onRefresh?: () => void;
  onSizeChange: (size: TableSize) => void;
}

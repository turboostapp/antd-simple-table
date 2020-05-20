import { ReactNode } from 'react';

import { ColumnSettingType } from './ColumnSettingType';
import { TableSize } from '../enums/TableSize';
import { SimpleColumnType } from './SimpleColumnType';
import { ToolBarOptions } from './ToolBarOptions';

export interface ToolBarProps<T> {
  columns: SimpleColumnType<T>[];
  columnSettings: ColumnSettingType[];
  options?: ToolBarOptions;
  size?: TableSize;
  toolBarRender?: () => ReactNode[];
  onColumnSettingsChange: (columnSettings: ColumnSettingType[]) => void;
  onDownload?: () => void;
  onRefresh?: () => void;
  onSizeChange: (size: TableSize) => void;
}

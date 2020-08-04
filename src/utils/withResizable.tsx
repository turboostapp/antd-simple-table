import { ColumnType } from "antd/lib/table";

import { ColumnSettingType } from "../interfaces/ColumnSettingType";
import { SimpleColumnType } from "../interfaces/SimpleColumnType";

export default function withResizable<T>(
  columns: SimpleColumnType<T>[],
  columnSettings: ColumnSettingType[],
  setColumnSettings: (columnSettings: ColumnSettingType[]) => void
): SimpleColumnType<T>[] {
  const nextColumnSettings = [...columnSettings];

  return columns.map(
    (column, index): SimpleColumnType<T> => {
      return {
        ...column,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onHeaderCell: (col: ColumnType<T>): any => {
          const { width } = col;
          return {
            width,
            fixed: column?.fixed,
            onResize: (event: Event, { size }) => {
              nextColumnSettings[index] = {
                ...nextColumnSettings[index],
                width: size.width,
              };
              setColumnSettings(nextColumnSettings);
            },
          };
        },
      };
    }
  );
}

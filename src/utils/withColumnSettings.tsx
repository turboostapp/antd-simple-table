import { ColumnSettingType } from "../interfaces/ColumnSettingType";
import { SimpleColumnType } from "../interfaces/SimpleColumnType";

export default function withColumnSettings<T>(
  columns: SimpleColumnType<T>[],
  columnSettings: ColumnSettingType[]
): SimpleColumnType<T>[] {
  const tempColumns: SimpleColumnType<T>[] = [];

  columnSettings.forEach((columnSetting): void => {
    const column = columns.find(
      ({ key }): boolean => key === columnSetting.key
    );

    if (column)
      tempColumns.push({
        ...column,
        hidden: columnSetting.hidden,
        fixed: columnSetting.fixed,
      });
  });

  return tempColumns;
}

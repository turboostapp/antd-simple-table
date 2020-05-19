import { ColumnSetting } from "../dto/ColumnSetting";
import { SimpleColumnType } from "../interfaces/SimpleColumnType";

export default function withColumnSettings<T>(
  columns: SimpleColumnType<T>[],
  columnSettings: ColumnSetting[]
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
        width: columnSetting.width,
      });
  });

  return tempColumns;
}

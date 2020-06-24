import { SimpleColumnType } from "../interfaces/SimpleColumnType";

export default function withDeleteColumnWidth<T>(
  columns: SimpleColumnType<T>[]
): SimpleColumnType<T>[] {
  const newColumns = [...columns];
  if (newColumns.length > 0) {
    for (let index = newColumns.length - 1; index >= 0; index--) {
      if (newColumns[index]?.fixed === "right") {
        continue;
      } else {
        delete newColumns[index]?.width;
        delete newColumns[index]?.fixed;
        break;
      }
    }
  }
  return newColumns;
}

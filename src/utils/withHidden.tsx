import { SimpleColumnType } from "../interfaces/SimpleColumnType";

export default function withHidden<T>(
  columns: SimpleColumnType<T>[]
): SimpleColumnType<T>[] {
  return columns.filter(({ hidden }): boolean => !hidden);
}

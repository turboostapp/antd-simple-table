import { SimpleColumnType } from "../interfaces/SimpleColumnType";

export default function withHidden<T>(
  columns: SimpleColumnType<T>[]
): SimpleColumnType<T>[] {
  return columns.filter((item) => !item?.hidden);
}

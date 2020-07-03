import { SimpleColumnType } from "../interfaces/SimpleColumnType";

export default function withTransformDataIndex<T>(
  columns: SimpleColumnType<T>[]
): SimpleColumnType<T>[] {
  return columns.map((column) => {
    if (column.dataIndex && typeof column.dataIndex === "string") {
      const keys = column.dataIndex.split(".");
      // 出现链式取值时才转换
      if (keys.length > 1) {
        const arryNameRegExp = new RegExp(/(\[\d+\])/, "g");
        const valueIndexRegExp = new RegExp(/(?<=\[)[\d+](?=\])/, "g");

        for (let index = 0; index < keys.length; index++) {
          if (/\[\d+\]$/.test(keys[index])) {
            keys.splice(
              index,
              1,
              keys[index].replace(arryNameRegExp, ""),
              ...keys[index].match(valueIndexRegExp)
            );
          }
        }
        return { ...column, dataIndex: keys };
      }
      return column;
    } else {
      return column;
    }
  });
}

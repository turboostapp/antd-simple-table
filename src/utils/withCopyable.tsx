import { Typography } from "antd";
import React, { ReactElement } from "react";

import { SimpleColumnType } from "../interfaces/SimpleColumnType";

export default function withCopyable<T>(
  columns: SimpleColumnType<T>[]
): SimpleColumnType<T>[] {
  return columns.map(
    (column): SimpleColumnType<T> => {
      if (column.copyable && column.dataIndex) {
        return {
          ...column,
          render: (text, record, index): ReactElement => (
            <Typography.Text
              copyable={{ text }}
              ellipsis={!!column.ellipsis}
              style={{
                width: "100%",
              }}
            >
              {column.render ? column.render(text, record, index) : text}
            </Typography.Text>
          ),
        };
      }

      return column;
    }
  );
}

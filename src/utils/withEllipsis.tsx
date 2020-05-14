import { Tooltip, Typography } from "antd";
import React, { ReactElement } from "react";

import { SimpleColumnType } from "../interfaces/SimpleColumnType";

export default function withEllipsis<T>(
  columns: SimpleColumnType<T>[]
): SimpleColumnType<T>[] {
  return columns.map(
    (column): SimpleColumnType<T> => {
      if (column.ellipsis && column.dataIndex) {
        return {
          ...column,
          ellipsis: false,
          render: (text, record, index): ReactElement =>
            text ? (
              <Tooltip placement="top" title={text.toString()}>
                {column.render ? (
                  <Typography.Text
                    ellipsis
                    style={{
                      width: "100%",
                    }}
                  >
                    {column.render(text, record, index)}
                  </Typography.Text>
                ) : (
                  text
                )}
              </Tooltip>
            ) : (
              <>{column.render ? column.render(text, record, index) : text}</>
            ),
        };
      }

      return column;
    }
  );
}

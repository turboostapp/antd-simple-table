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
              <Typography.Text
                ellipsis
                title={text}
                style={{
                  width: column?.width,
                }}
              >
                <Tooltip placement="top" title={String(text)}>
                  {column.render ? column.render(text, record, index) : text}
                </Tooltip>
              </Typography.Text>
            ) : (
              <>{column.render ? column.render(text, record, index) : text}</>
            ),
        };
      }

      return column;
    }
  );
}

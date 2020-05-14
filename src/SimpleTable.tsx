import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import { get } from "lodash";
import moment from "moment";
import React, { ReactElement, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import XLSX from "xlsx";

import ResizeableTitle from "./components/ResizeableTitle";
import { ToolBar } from "./components/ToolBar";
import { TableSize } from "./enums/TableSize";
import { useColumnSettingsStorage } from "./hooks/useColumnSettingsStorage";
import { SimpleColumnType } from "./interfaces/SimpleColumnType";
import { ToolBarOptions } from "./interfaces/ToolBarOptions";
import { ToolBarProps } from "./interfaces/ToolBarProps";
import withColumnSettings from "./utils/withColumnSettings";
import withCopyable from "./utils/withCopyable";
import withEllipsis from "./utils/withEllipsis";
import withHidden from "./utils/withHidden";
import withRenderByValueType from "./utils/withRenderByValueType";
import withResizable from "./utils/withResizable";

const StyledSimpleTable = styled.div`
  .ant-table-content table {
    table-layout: fixed !important;
  }
`;

export interface SimpleTableProps<T>
  extends TableProps<T>,
    Pick<ToolBarProps<T>, "toolBarRender" | "onRefresh"> {
  columns: SimpleColumnType<T>[];
  id: string;
  name?: string;
  options?: ToolBarOptions;
  threshold?: number;
}

export const SimpleTable = <T extends {}>({
  columns = [],
  dataSource,
  id,
  loading,
  name,
  options = {
    fullScreen: true,
    reload: true,
    setting: true,
    size: true,
    download: true,
  },
  pagination,
  toolBarRender,
  onRefresh,
  ...props
}: SimpleTableProps<T>): ReactElement => {
  const [size, setSize] = useState<TableSize>();

  const [columnSettings, setColumnSettings] = useColumnSettingsStorage(
    id,
    columns
  );

  const interColumns = useMemo((): SimpleColumnType<T>[] => {
    let tempColumns: SimpleColumnType<T>[] = columns;
    tempColumns = withColumnSettings(tempColumns, columnSettings);
    tempColumns = withResizable(tempColumns, columnSettings, setColumnSettings);
    tempColumns = withHidden(tempColumns);
    tempColumns = withRenderByValueType(tempColumns);

    tempColumns = withCopyable(tempColumns);
    tempColumns = withEllipsis(tempColumns);

    return tempColumns;
  }, [columns, columnSettings, setColumnSettings]);

  const x = useMemo(
    () => interColumns.reduce((width, col) => width + (col.width || 0), 0),
    [interColumns]
  );

  const components = useMemo(
    () => ({
      header: {
        cell: ResizeableTitle,
      },
    }),
    []
  );

  /**
   *  .csv 下载
   */
  const handleDownload = useCallback((): void => {
    if (!dataSource) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: { [key: string]: any }[] = [];

    const downloadColumns = interColumns.filter(
      (column): boolean => !!column.dataIndex
    );

    dataSource.forEach((record): void => {
      const row = {};

      downloadColumns.forEach((column): void => {
        const dataIndex: string =
          column.dataIndex instanceof Array
            ? column.dataIndex.join(".")
            : `${column.dataIndex}`;

        row[typeof column.title === "string" ? column.title : dataIndex] = get(
          record,
          dataIndex
        );
      });

      data.push(row);
    });

    const book = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(book, sheet);
    XLSX.writeFile(book, `${moment().format("YYYY-MM-DD")}-${name || id}.xlsx`);
  }, [dataSource, id, interColumns, name]);

  return (
    <StyledSimpleTable>
      <ToolBar
        columns={columns}
        columnSettings={columnSettings}
        options={options}
        size={size}
        toolBarRender={toolBarRender}
        onColumnSettingsChange={setColumnSettings}
        onDownload={handleDownload}
        onRefresh={onRefresh}
        onSizeChange={setSize}
      />

      <Table<T>
        {...props}
        columns={interColumns}
        components={components}
        dataSource={dataSource}
        loading={loading}
        pagination={pagination}
        scroll={{ x }}
        size={size}
      />
    </StyledSimpleTable>
  );
};

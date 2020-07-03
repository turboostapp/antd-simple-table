/* eslint-disable react/jsx-props-no-spreading */
import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import { saveAs } from "file-saver";
import get from "lodash/get";
import moment from "moment";
import Papa from "papaparse";
import React, { ReactElement, useCallback, useMemo, useState } from "react";
import styled from "styled-components";

import ResizeableTitle from "./components/ResizeableTitle";
import { ToolBar } from "./components/ToolBar";
import { TableSize } from "./enums/TableSize";
import { useColumnSettingsStorage } from "./hooks/useColumnSettingsStorage";
import { SimpleColumnType } from "./interfaces/SimpleColumnType";
import { ToolBarOptions } from "./interfaces/ToolBarOptions";
import { ToolBarProps } from "./interfaces/ToolBarProps";
import withColumnSettings from "./utils/withColumnSettings";
import withCopyable from "./utils/withCopyable";
import withDeleteColumnWidth from "./utils/withDeleteColumnWidth";
import withEllipsis from "./utils/withEllipsis";
import withHidden from "./utils/withHidden";
import withRenderByValueType from "./utils/withRenderByValueType";
import withResizable from "./utils/withResizable";
import withTransformDataIndex from "./utils/withTransformDataIndex";

const StyledSimpleTable = styled.div`
  .ant-table-content table {
    table-layout: auto !important;
    width: max-content !important;
    min-width: 100%;
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
    tempColumns = withTransformDataIndex(tempColumns);
    tempColumns = withDeleteColumnWidth(tempColumns);
    tempColumns = withRenderByValueType(tempColumns);

    tempColumns = withCopyable(tempColumns);
    tempColumns = withEllipsis(tempColumns);

    return tempColumns;
  }, [columns, columnSettings, setColumnSettings]);

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

    const blob = new Blob(
      [new Uint8Array([0xef, 0xbb, 0xbf]), Papa.unparse(data)],
      {
        type: "text/csv;charset=utf-8",
      }
    );

    saveAs(blob, `${moment().format("YYYY-MM-DD")}-${name || id}.csv`);
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
        scroll={{ x: "max-content" }}
        size={size}
      />
    </StyledSimpleTable>
  );
};

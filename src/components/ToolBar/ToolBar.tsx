import {
  ColumnHeightOutlined,
  DownloadOutlined,
  SettingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Checkbox, Divider, Dropdown, Menu, Popover, Tooltip } from "antd";
import update from "immutability-helper";
import React, { ReactElement, useCallback, useMemo } from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import styled from "styled-components";

import { ColumnSetting } from "../../dto/ColumnSetting";
import { TableSize } from "../../enums/TableSize";
import { ToolBarProps } from "../../interfaces/ToolBarProps";
import DndCheckbox from "./DndCheckbox";

const StyledToolBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 64px;
  padding: 0 16px;

  line-height: 64px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`;

export const ToolBar = <T extends {}>({
  columns,
  columnSettings,
  options,
  toolBarRender,
  onColumnSettingsChange,
  onDownload,
  onRefresh,
  onSizeChange,
}: ToolBarProps<T>): ReactElement => {
  const actions = toolBarRender ? toolBarRender() : [];

  const showColumnKeys = useMemo(
    (): string[] =>
      columnSettings
        .filter((columnSetting): boolean => !columnSetting.hidden)
        .map((columnSetting): string => `${columnSetting.key}`),
    [columnSettings]
  );

  const handleHover = useCallback(
    (dragIndex: number, hoverIndex: number): void => {
      onColumnSettingsChange(
        update(columnSettings, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, columnSettings[dragIndex]],
          ],
        })
      );
    },
    [columnSettings, onColumnSettingsChange]
  );

  return (
    <StyledToolBar>
      <Option>
        {actions.map(
          (action, index): ReactElement => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} style={{ marginRight: 8 }}>
              {action}
            </div>
          )
        )}

        {actions.length > 0 ? <Divider type="vertical" /> : null}

        {options?.download ? (
          <div style={{ marginLeft: 8 }}>
            <Tooltip title="下载">
              <DownloadOutlined
                spin={false}
                style={{ fontSize: 17 }}
                onClick={onDownload}
              />
            </Tooltip>
          </div>
        ) : null}

        {options?.size ? (
          <div style={{ marginLeft: 16 }}>
            <Dropdown
              overlay={
                <Menu
                  onClick={({ key }): void => onSizeChange(key as TableSize)}
                >
                  <Menu.Item key={TableSize.LARGE}>默认</Menu.Item>
                  <Menu.Item key={TableSize.MIDDLE}>中等</Menu.Item>
                  <Menu.Item key={TableSize.SMALL}>紧凑</Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <Tooltip title="尺寸">
                <ColumnHeightOutlined style={{ fontSize: 16 }} />
              </Tooltip>
            </Dropdown>
          </div>
        ) : null}

        {options?.reload ? (
          <div style={{ marginLeft: 16 }}>
            <Tooltip title="刷新">
              <SyncOutlined
                spin={false}
                style={{ fontSize: 16 }}
                onClick={onRefresh}
              />
            </Tooltip>
          </div>
        ) : null}

        {options?.setting ? (
          <div style={{ marginLeft: 16 }}>
            <Tooltip title="列设置">
              <Popover
                content={
                  <Checkbox.Group
                    value={showColumnKeys}
                    onChange={(value): void => {
                      onColumnSettingsChange(
                        columnSettings.map(
                          (columnSetting): ColumnSetting => ({
                            ...columnSetting,
                            hidden: value.indexOf(`${columnSetting.key}`) < 0,
                          })
                        )
                      );
                    }}
                  >
                    <DndProvider backend={Backend}>
                      {columnSettings.map(
                        (item, index): ReactElement => (
                          <DndCheckbox
                            index={index}
                            key={item.key}
                            value={item.key}
                            onHover={handleHover}
                          >
                            {
                              columns.find(
                                (column): boolean => column.key === item.key
                              )?.title
                            }
                          </DndCheckbox>
                        )
                      )}
                    </DndProvider>
                  </Checkbox.Group>
                }
                placement="bottomLeft"
                trigger="click"
              >
                <SettingOutlined spin={false} style={{ fontSize: 16 }} />
              </Popover>
            </Tooltip>
          </div>
        ) : null}
      </Option>
    </StyledToolBar>
  );
};

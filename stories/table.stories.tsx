import { storiesOf } from "@storybook/react";
import React from "react";
import { addReadme } from "storybook-readme";

import { SimpleTable, ValueType } from "../src";
import Readme from "./doc.md";

const stories = storiesOf("Base", module);

stories.addDecorator(addReadme);
stories.addParameters({
  info: {
    inline: true,
    header: false,
  },
  options: {
    panelPosition: "right", // 操作面板在右边
  },
  readme: {
    sidebar: Readme,
  },
});

stories.add("example", () => (
  <SimpleTable
    id="example"
    columns={[
      {
        title: "行号",
        key: "index",
        fixed: "left",
        valueType: ValueType.INDEX,
      },
      {
        title: "电子邮件",
        key: "email",
        dataIndex: "email",
        width: 120,
        ellipsis: true,
        copyable: true,
      },
      {
        title: "开关",
        key: "switch",
        dataIndex: "switch",
        width: 120,
        valueType: {
          type: ValueType.SWITCH,
          size: "small",
        },
      },
      {
        title: "时间",
        key: "time",
        dataIndex: "time",
        width: 120,
        valueType: ValueType.TIME,
      },
      {
        title: "日期",
        key: "day",
        dataIndex: "day",
        width: 120,
        valueType: ValueType.DATE,
      },
      {
        title: "日期时间",
        key: "dayTime",
        dataIndex: "dayTime",
        width: 120,
        ellipsis: true,
        valueType: ValueType.DATE_TIME,
      },
      {
        title: "百分比",
        key: "percent",
        dataIndex: "percent",
        width: 120,
        valueType: {
          type: ValueType.PERCENT,
          showSymbol: true,
          precision: 2,
          useGrouping: true,
        },
      },
      {
        title: "数字",
        key: "number",
        dataIndex: "number",
        width: 120,
        valueType: ValueType.NUMBER,
      },
      {
        title: "货币",
        key: "money",
        dataIndex: "money",
        width: 120,
        valueType: {
          type: ValueType.MONEY,
          currency: (value, record): string => record.currencyCode,
        },
      },
      {
        title: "标签",
        key: "tags",
        dataIndex: "tags",
        width: 120,
        valueType: ValueType.TAG,
      },
    ]}
    dataSource={[
      {
        day: 1593574128917,
        dayTime: 1593574128917,
        switch: false,
        email: "1593574128917@gmail.com",
        time: 1593574128917,
        money: 100,
        number: 159357.4128917,
        percent: 0.97,
        tags: ["2020-7-1", "管理员"],
        currencyCode: "USD",
      },
      {
        day: 1593576128917,
        switch: true,
        dayTime: 1593576128917,
        email: "1593576128917@163.com",
        time: 1593576128917,
        money: 1000,
        percent: -0.023,
        number: -159356.41289,
        tags: ["2020-7-1", "用户"],
        currencyCode: "EUR",
      },
    ]}
  />
));

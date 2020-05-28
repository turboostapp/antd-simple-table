import React from "react";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import { SimpleTable, ValueType } from "../src";
const stories = storiesOf("Table1", module);

stories.addDecorator(withInfo);
stories.addParameters({
  info: { inline: true },
  options: {
    panelPosition: "right", //操作面板在右边
  },
});

stories.add("base", () => (
  <SimpleTable
    id="as"
    columns={[
      {
        title: "日期",
        key: "day",
        dataIndex: "day",
        width: 120,
        valueType: ValueType.DATE_TIME,
      },
      {
        title: "email",
        key: "email",
        dataIndex: "email",
        width: 120,
        valueType: {
          type: ValueType.TAG,
        },
      },
    ]}
    dataSource={[
      { day: 1215, email: ["da", "das"] },
      { day: 1215, email: "das" },
    ]}
  />
));

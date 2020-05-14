import React, { ReactElement } from "react";
import { SimpleTable, ValueType } from "../dist/antd-simple-table.esm";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

const stories = storiesOf("Table1", module);

stories.addDecorator(withInfo);
stories.addParameters({ info: { inline: true } });

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
  ></SimpleTable>
));

// storiesOf("Table", module)
//   .addDecorator(
//     withInfo({
//       styles: {
//         infoBody: {
//           backgroundColor: "#eee",
//           padding: "0px 5px",
//           lineHeight: "2",
//         },
//       },
//       inline: true,
//       source: false,
//       header: false,
//     })
//   )
//   .add("base", () => (
//     <SimpleTable
//       id="as"
//       columns={[
//         {
//           title: "日期",
//           key: "day",
//           dataIndex: "day",
//           width: 120,
//           valueType: ValueType.DATE_TIME,
//         },
//         {
//           title: "email",
//           key: "email",
//           dataIndex: "email",
//           width: 120,
//           valueType: {
//             type: ValueType.TAG,
//           },
//         },
//       ]}
//       dataSource={[
//         { day: 1215, email: ["da", "das"] },
//         { day: 1215, email: "das" },
//       ]}
//     ></SimpleTable>
//   ));

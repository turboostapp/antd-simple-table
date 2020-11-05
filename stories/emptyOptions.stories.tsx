import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import React from "react";

import { SimpleTable, ValueType } from "../src";

const stories = storiesOf("功能图标", module);

stories.addDecorator(withInfo);

stories.add("无功能图标", () => (
  <SimpleTable
    id="emptyOptions"
    options={false}
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
        align: "center",
        width: 120,
        copyable: true,
      },
      {
        title: "user",
        key: "user",
        dataIndex: ["user", "users", 0, 0, "name"],
        width: 120,
      },
      {
        title: "checkoutTime",
        key: "shop",
        dataIndex: ["shop", "checkouts", 0, 0, "time"],
        valueType: ValueType.DATE_TIME,
        width: 120,
      },
    ]}
    dataSource={[
      {
        day: 1593764623930,
        email: "1593764366@163.com",
        user: {
          users: [[{ name: "Adam" }], [{ name: "Alan" }]],
        },
        shop: {
          checkouts: [[{ time: 1593765339654 }], [{ time: 1593765339654 }]],
        },
      },
      {
        day: 1593764382866,
        email: "",
        user: {
          users: [[{ name: "Tom" }], [{ name: "Tony" }]],
        },
        shop: {
          checkouts: [[{ time: 1593764382866 }], [{ time: 1593764382866 }]],
        },
      },
    ]}
  />
));

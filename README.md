# antd-simple-table

[![Build Status](https://img.shields.io/github/workflow/status/shadowolfapp/antd-simple-table/Release)](https://github.com/shadowolfapp/antd-simple-table/actions?query=workflow%3A%22Release%22)
[![Coverage Status](https://img.shields.io/codecov/c/github/shadowolfapp/antd-simple-table)](https://codecov.io/github/shadowolfapp/antd-simple-table)
[![License](https://img.shields.io/npm/l/antd-simple-table)](https://www.npmjs.com/package/antd-simple-table)
[![Version](https://img.shields.io/npm/v/antd-simple-table)](https://www.npmjs.com/package/antd-simple-table)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Semantic Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![Dependabot](https://badgen.net/dependabot/thepracticaldev/dev.to?icon=dependabot)

<h1>🚀 antd-simple-table</h1>
<!-- TOC -->

- [antd-simple-table](#antd-simple-table)
  - [✨ 特色功能](#-特色功能)
  - [📦 安装](#-安装)
  - [🔨 使用说明](#-使用说明)
    - [示例](#示例)
    - [指定表格右上角功能键](#指定表格右上角功能键)
    - [保存为 Excel 文件到本地](#保存为-excel-文件到本地)
    - [刷新列表](#刷新列表)
    - [可复制的](#可复制的)
    - [隐藏表格内容](#隐藏表格内容)
    - [默认值类型](#默认值类型)
      - [1. 百分比](#1-百分比)
      - [2. 货币](#2-货币)
      - [3. 数字](#3-数字)
      - [4. 标签](#4-标签)
      - [5. 开关](#5-开关)

<!-- /TOC -->

<br/>

## ✨ 特色功能

- 列设置
  开启 antd-simple-table 表头的列设置 ⚙️ 按钮，可以选择性的隐藏表格的某些列，还可以使用鼠标拖动切换列顺序。重要的是这些配置信息会被保存，关闭网页重新打开将会恢复之前配置。
- 下载
  antd-simple-table 提供将表格数据下载为 Exel 文件到用户电脑。

<br/>

## 📦 安装

antd-simple-table 基于 Ant Design 构建，使用时务必同时安装 antd

```
npm i antd-simple-table @ant-design/icons antd
```

or

```
yarn add antd-simple-table @ant-design/icons antd
```

<br/>

## 🔨 使用说明

### 示例

&emsp; 您可以参考以下 storybook 精选示例，以了解 ant-simple-table 的工作方式: <https://antd-simple-table-b472afd.netlify.app>

### 指定表格右上角功能键

&emsp; 表头默认展示全部功能键，包括下载、尺寸、刷新、设置列。可设置 **options** 选择性隐藏功能键。

```javascript
<SimpleTable
  id="user"
  name="用户"
  options={{ size: false, download: true, setting: true, reload: true }}
/>
```

<br/>

### 保存为 Excel 文件到本地

&emsp; 点击表头下载图标，可将表格数据以 **Excel** 文件存储到本地。设置 **name** 可指定保存到本地的文件名称。

```javascript
<SimpleTable id="user" name="用户" />

// 保存到本地的文件名为：2020-05-31-用户
```

<br/>

### 刷新列表

&emsp; **onRefresh** 可实现刷新操作

```javascript
<SimpleTable
  id="user"
  name="用户"
  onRefresh={async () => {
    const { data } = await axios.get(`https://xxx`);
    ...
  }}
/>
```

<br/>

### 可复制的

&emsp; 在 **columns** 属性中设置 **copyable** 为 true 后，可将表格数据复制到剪切板。

```javascript
<SimpleTable
  id="user"
  name="用户"
  columns={[
    {
      title: "日期",
      key: "day",
      dataIndex: "day",
      copyable: true,
    },
  ]}
/>
```

<br/>

### 隐藏表格内容

&emsp; 当表格数据内容超出列宽度，可设置 **ellipsis** 为 true 进行缩略展示。

```javascript
<SimpleTable
  id="user"
  name="用户"
  columns={[
    {
      title: "日期",
      key: "day",
      dataIndex: "day",
      ellipsis: true,
    },
  ]}
/>
```

<br/>

### 默认值类型

&emsp; SimpleTable 封装了一些常用的值类型来减少重复的 render 操作，配置 **valueType** 即可展示格式化响应的数据。

ValueType 目前支持的值类型如下：

| 类型                | 描述       | 渲染结果示例            |
| ------------------- | ---------- | ----------------------- |
| ValueType.DATE      | 日期       | 2019-11-16              |
| ValueType.DATE_TIME | 日期和时间 | 2019-11-16 12:50:00     |
| ValueType.TIME      | 时间       | 12:50:00                |
| ValueType.INDEX     | 行号       | -                       |
| ValueType.PERCENT   | 百分号     | 23%                     |
| ValueType.NUMBER    | 数字       | 23.23                   |
| ValueType.MONEY     | 货币       | ¥10,000.26、\$100、€100 |
| ValueType.TAG       | 标签       | -                       |
| ValueType.SWITCH    | 开关       | -                       |

<br/>

#### 1. 百分比

**valueType** 传入类型字符串

```javascript
import { ValueType } from "antd-simple-table";

<SimpleTable
  id="user"
  name="用户"
  columns={[
    {
      title: "百分比",
      key: "percent",
      dataIndex: "percent",
      valueType: ValueType.PERCENT,
    },
  ]}
/>;

// 最大保留小数点后 20 位
```

**valueType** 传入类型配置对象

```javascript
import { ValueType } from "antd-simple-table";
<SimpleTable
  id="user"
  name="用户"
  columns={[
    {
      title: "百分比",
      key: "percent",
      dataIndex: "percent",
      valueType: {
        type: ValueType.PERCENT,
        showSymbol: false,
        useGrouping: false,
        precision: 2,
      },
    },
  ]}
/>;
```

| valueType 参数 | 参数类型 | 描述                       | 示例              |
| -------------- | -------- | -------------------------- | ----------------- |
| type           | string   | 类型                       | ValueType.PERCENT |
| showSymbol     | boolean  | 是否显示正负号             | +23% (-23%)       |
| useGrouping    | boolean  | 是否显示分隔符             | 10,000.00%        |
| precision      | number   | 保留小数点后位数，默认两位 | 23.00%            |

<br/>

#### 2. 货币

配置为货币类型，经过 antd-simple-table 内部 format 后自动转换为您想要的货币格式。

**valueType** 传入对象

```javascript
import { ValueType } from "antd-simple-table";
const column = {
  title: "货币",
  key: "money",
  dataIndex: "money",
  valueType: {
    type: ValueType.MONEY,
    currency: "USD"
    useGrouping: false,
  },
};
```

| valueType 参数 | 参数类型                                                | 描述           | 示例            |
| -------------- | ------------------------------------------------------- | -------------- | --------------- |
| type           | string                                                  | 类型           | ValueType.MONEY |
| currency       | string ｜（value:any, record:T, index:number）=> string | 货币代码       | "USD"           |
| useGrouping    | boolean                                                 | 是否显示分隔符 | \$10,000,000    |

<br/>

<font color="red">⚠️ 注意：</font>若 dataSource 中有指定货币符号，currency 可以传入函数，返回 record 中的货币符号。此场景适用于货币符号由后端数据决定。

<br/>

currency 输出参数说明

| 参数   | 参数类型 | 描述               | 示例 |
| ------ | -------- | ------------------ | ---- |
| value  | any      | -                  | -    |
| record | T        | 该行所有属性       | -    |
| index  | number   | 该行在表格中的序号 | -    |

<br/>

```javascript
import { ValueType } from "antd-simple-table";
const column = {
  title: "货币",
  key: "money",
  dataIndex: "money",
  valueType: {
    type: ValueType.MONEY,
    currency: (value, record, index) => record.currencyCode
    useGrouping: false,
  },
};
```

<br/>

#### 3. 数字

**valueType** 传入字符串

```javascript
import { ValueType } from "antd-simple-table";
const column = {
  title: "数字",
  key: "number",
  dataIndex: "number",
  valueType: ValueType.NUMBER,
};

// 最大保留小数点后 20 位，不展示分隔符
```

**valueType** 传入对象

```javascript
import { ValueType } from "antd-simple-table";
const column = {
  title: "数字",
  key: "number",
  dataIndex: "number",
  valueType: {
    type: ValueType.NUMBER,
    useGrouping: true,
    precision: 3,
  },
};

// 保留小数点后 3 位，使用分隔符。
```

| valueType 参数 | 参数类型 | 描述                        | 示例             |
| -------------- | -------- | --------------------------- | ---------------- |
| type           | string   | 类型                        | ValueType.NUMBER |
| precision      | number   | 保留小数点后位数，默认 3 位 | 23.000           |
| useGrouping    | boolean  | 是否显示分隔符              | 10,000,000       |

<br/>

#### 4. 标签

<br/>

<font color = "red">⚠️ 注意！</font> dataSource 中的 tag 标签必须为数组才能正常渲染。

<br/>

**valueType** 传入字符串

```javascript
import { ValueType } from "antd-simple-table";
const column = {
  title: "标签",
  key: "tags",
  dataIndex: "tags",
  valueType: ValueType.TAG,
};
```

<br/>

如果你想给表格中的标签绑定点击事件，可以以对象形式传入 onClick 属性。

<br/>

**valueType** 传入对象

```javascript
import { ValueType } from "antd-simple-table";
const column = {
  title: "数字",
  key: "number",
  dataIndex: "number",
  valueType: {
    type: ValueType.TAG,
    onClick: (tag, tags, record, index) => {
      console.log(tag, tags, record, index);
    },
  },
};
```

onClick 输出参数说明

| 参数   | 参数类型                     | 描述                                                             | 示例                          |
| ------ | ---------------------------- | ---------------------------------------------------------------- | ----------------------------- |
| tag    | [tag: string, index: number] | 被点击的 tag， tag[0] 为 tag 文本，tag[1] 为在 tags 数组中的索引 | ["Tony"， 1]                  |
| tags   | any[]                        | 该行所有 tag                                                     | ["2020-6-1", "Tom", "管理员"] |
| record | T                            | 该行所有属性                                                     | -                             |
| index  | number                       | 该行在表格中的序号                                               | -                             |

<br/>

#### 5. 开关

**valueType** 传入对象

```javascript
import { ValueType } from "antd-simple-table";
const column = {
  title: "开关",
  key: "enable",
  dataIndex: "enable",
  valueType: {
    type: ValueType.SWITCH,
    loading: loading,
    disabled: false,
    size: "small"
    onChange: (value, oldValue, record, index) => {
      console.log(value, oldValue, record, index);
    },
  },
};
```

| valueType 参数 | 参数类型                                 | 描述               | 示例             |
| -------------- | ---------------------------------------- | ------------------ | ---------------- |
| type           | string                                   | 类型               | ValueType.SWITCH |
| loading        | boolean                                  | 是否正在加载       | -                |
| size           | small                                    | default            | 按钮大小         | - |
| disabled       | boolean                                  | 是否禁用开关       | -                |
| onChange       | (value, oldValue, record, index) => void | 拨动开关的事件回调 | -                |

onChange 输出参数说明

| 参数     | 参数类型 | 描述               | 示例 |
| -------- | -------- | ------------------ | ---- |
| value    | boolean  | 当前开关状态       | -    |
| oldValue | any      | 原始数据           | -    |
| record   | T        | 该行所有属性       | -    |
| index    | number   | 该行在表格中的序号 | -    |

<br/>
<br/>

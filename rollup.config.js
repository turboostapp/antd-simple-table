import typescript from "@wessberg/rollup-plugin-ts";
import pkg from "./package.json";

export default [
  {
    input: "./src/index.tsx",
    plugins: [
      typescript(),
      {
        transpiler: "babel",
      },
    ],
    external: [
      "react",
      "antd",
      "moment",
      "@ant-design/icons",
      "styled-components",
      "xlsx",
      "lodash",
      "react-dom",
      "babel-loader",
      "@babel/core",
      "class-transformer",
      "class-validator",
      "dnd-core",
      "immutability-helper",
      "react-dnd",
      "react-dnd-html5-backend",
      "react-resizable",
    ],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
];

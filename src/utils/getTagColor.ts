/**
 * 根据标签字符串转换为 antd 特定标签色值
 */
export default (str: string): string => {
  const colors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];
  let hash = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + Math.abs(hash << 3);
  }
  return colors[hash % colors.length];
};

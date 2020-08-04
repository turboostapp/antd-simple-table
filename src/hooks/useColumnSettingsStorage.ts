import uniqBy from "lodash/uniqBy";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDebounce, useLocalStorage } from "react-use";

import { ColumnSettingType } from "../interfaces/ColumnSettingType";
import { SimpleColumnType } from "../interfaces/SimpleColumnType";

export function useColumnSettingsStorage<T>(
  id: string,
  columns: SimpleColumnType<T>[]
): [ColumnSettingType[], Dispatch<SetStateAction<ColumnSettingType[]>>] {
  const key = useMemo(() => `simple-table:column-settings:${id}`, [id]);

  const [value, setValue] = useState<ColumnSettingType[]>();

  const [localStorageValue, setLocalStorageValue] = useLocalStorage<
    ColumnSettingType[]
  >(key, []);

  useDebounce(
    () => {
      setLocalStorageValue(value);
    },
    1000,
    [value]
  );

  const columnSettings = useMemo((): ColumnSettingType[] => {
    if (localStorageValue?.length !== columns.length) {
      return [
        ...columns.map(
          (column): ColumnSettingType => ({
            key: String(column?.key),
            hidden: !!column.hidden,
            fixed: column?.fixed || false,
          })
        ),
      ];
    }

    let isConfigChanged = false;

    // 判断代码的 key 是否更新
    for (const value of localStorageValue) {
      if (!columns.find((column): boolean => column.key === value.key)) {
        isConfigChanged = true;
        break;
      }
    }

    if (isConfigChanged) {
      return [
        ...columns.map(
          (column): ColumnSettingType => ({
            key: String(column?.key),
            hidden: !!column.hidden,
            fixed: column?.fixed || false,
          })
        ),
      ];
    }

    return uniqBy(
      [
        ...localStorageValue,
        ...columns.map(
          (column): ColumnSettingType => ({
            key: String(column?.key),
            hidden: !!column.hidden,
            fixed: column.fixed || false,
          })
        ),
      ],
      "key"
    ).filter(
      (columnSetting): boolean =>
        !!columns.find((column): boolean => column.key === columnSetting.key)
    );
  }, [columns, localStorageValue, localStorageValue?.length]);

  const [state, setState] = useState<ColumnSettingType[]>(columnSettings);

  useEffect(() => {
    setState(columnSettings);
  }, [columnSettings]);

  return [
    state,
    useCallback((value): void => {
      setValue(value);
      return setState(value);
    }, []),
  ];
}

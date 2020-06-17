import { uniqBy } from "lodash";
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
    return uniqBy(
      [
        ...localStorageValue,
        ...columns.map(
          (column): ColumnSettingType => ({
            key: column.key.toString(),
            hidden: !!column.hidden,
            width: Number(column.width) || 140,
          })
        ),
      ],
      "key"
    ).filter(
      (columnSetting): boolean =>
        !!columns.find((column): boolean => column.key === columnSetting.key)
    );
  }, [columns, localStorageValue]);

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

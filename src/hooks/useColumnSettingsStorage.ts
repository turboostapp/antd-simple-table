import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { debounce, uniqBy } from "lodash";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ColumnSetting } from "../dto/ColumnSetting";
import { SimpleColumnType } from "../interfaces/SimpleColumnType";

const saveToStorage = debounce(
  (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  1000
);

export function useColumnSettingsStorage<T>(
  id: string,
  columns: SimpleColumnType<T>[]
): [ColumnSetting[], Dispatch<SetStateAction<ColumnSetting[]>>] {
  const key = useMemo((): string => `simple-table:column-settings:${id}`, [id]);

  const columnSettings = useMemo((): ColumnSetting[] => {
    let tempColumnSettings: ColumnSetting[] = [];

    try {
      tempColumnSettings = (JSON.parse(
        localStorage.getItem(key) || "[]"
      ) as ColumnSetting[])
        .map((plain): ColumnSetting => plainToClass(ColumnSetting, plain))
        .filter((columnSetting): boolean => {
          return validateSync(columnSetting, { whitelist: true }).length === 0;
        });
    } catch (err) {
      tempColumnSettings = [];
    }

    return uniqBy(
      [
        ...tempColumnSettings,
        ...columns.map(
          (column): ColumnSetting => ({
            key: column.key.toString(),
            hidden: !!column.hidden,
            width: Number(column.width),
          })
        ),
      ],
      "key"
    ).filter(
      (columnSetting): boolean =>
        !!columns.find((column): boolean => column.key === columnSetting.key)
    );
  }, [columns, key]);

  const [state, setState] = useState<ColumnSetting[]>(columnSettings);

  useEffect(() => {
    setState(columnSettings);
  }, [columnSettings]);

  return [
    state,
    useCallback(
      (value): void => {
        saveToStorage(key, value);
        return setState(value);
      },
      [key]
    ),
  ];
}

import { debounce, uniqBy } from 'lodash';
import { useLocalStorage } from 'react-use';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';

import { ColumnSettingType } from '../interfaces/ColumnSettingType';
import { SimpleColumnType } from '../interfaces/SimpleColumnType';

const saveToStorage = debounce(
  (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  1000,
);

export function useColumnSettingsStorage<T>(
  id: string,
  columns: SimpleColumnType<T>[],
): [ColumnSettingType[], Dispatch<SetStateAction<ColumnSettingType[]>>] {
  const key = useMemo((): string => `simple-table:column-settings:${id}`, [id]);

  const [value] = useLocalStorage<ColumnSettingType[]>(key, []);

  const columnSettings = useMemo((): ColumnSettingType[] => {
    return uniqBy(
      [
        ...value,
        ...columns.map(
          (column): ColumnSettingType => ({
            key: column.key.toString(),
            hidden: !!column.hidden,
            width: Number(column.width),
          }),
        ),
      ],
      'key',
    ).filter(
      (columnSetting): boolean =>
        !!columns.find((column): boolean => column.key === columnSetting.key),
    );
  }, [columns, key]);

  const [state, setState] = useState<ColumnSettingType[]>(columnSettings);

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
      [key],
    ),
  ];
}

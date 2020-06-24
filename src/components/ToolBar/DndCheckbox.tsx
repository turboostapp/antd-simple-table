import { PushpinOutlined } from "@ant-design/icons";
import { Checkbox, Tooltip } from "antd";
import { CheckboxProps } from "antd/lib/checkbox";
import { XYCoord } from "dnd-core";
import React, { ReactElement, useCallback, useRef } from "react";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import styled from "styled-components";

import { PositionType } from "../../interfaces/PositionType";

const StyledPushpinOutlined = styled(
  ({ className, fixed, transform, ...props }): ReactElement => (
    <PushpinOutlined {...props} className={className} />
  )
)`
  transform: ${(props) => (props?.transform ? "rotate(-90deg)" : "")};
  color: ${(props) => (props?.fixed ? "red" : "")};
  margin: 0 0.5rem;
`;

const StyledDndCheckbox = styled.div`
  margin: 0.6rem 0;
`;

const StyledSpan = styled.span`
  float: right;
  margin-left: 1.5rem;
`;

const ItemTypes = {
  OPTION: "option",
};

interface DndCheckboxProps extends CheckboxProps {
  index: number;
  fixed?: PositionType;
  onConfigsChange: (
    dragIndex: number,
    hoverIndex: number,
    fixed?: PositionType
  ) => void;
}

interface DragItem {
  index: number;
  type: string;
}

const DndCheckbox: React.FC<DndCheckboxProps> = ({
  children,
  index,
  value,
  fixed,
  onConfigsChange,
}): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ItemTypes.OPTION,
    hover(item: DragItem, monitor: DropTargetMonitor): void {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const hoverBoundingRect = ref.current!.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onConfigsChange(dragIndex, hoverIndex);

      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.OPTION, id: value, index },
    canDrag: !fixed,
    collect: (monitor): { [key: string]: boolean } => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const setFixedStatus = useCallback(
    (position: PositionType) => {
      if (fixed === position) {
        onConfigsChange(index, 0, false);
      } else {
        onConfigsChange(index, 0, position);
      }
    },
    [fixed, index, onConfigsChange]
  );

  return (
    <StyledDndCheckbox ref={ref} style={{ opacity }}>
      <Checkbox value={value}>{children}</Checkbox>
      <StyledSpan>
        <Tooltip
          placement="top"
          title={fixed === "left" ? "取消固定" : "固定到左边"}
        >
          <StyledPushpinOutlined
            fixed={fixed === "left"}
            onClick={(): void => setFixedStatus("left")}
          />
        </Tooltip>
        <Tooltip
          placement="top"
          title={fixed === "right" ? "取消固定" : "固定到右边"}
        >
          <StyledPushpinOutlined
            transform
            fixed={fixed === "right"}
            onClick={(): void => setFixedStatus("right")}
          />
        </Tooltip>
      </StyledSpan>
    </StyledDndCheckbox>
  );
};

export default DndCheckbox;

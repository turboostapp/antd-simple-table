import { Checkbox, Col, Row } from "antd";
import { CheckboxProps } from "antd/lib/checkbox";
import { XYCoord } from "dnd-core";
import React, { ReactElement, useRef } from "react";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  OPTION: "option",
};

interface DndCheckboxProps extends CheckboxProps {
  index: number;
  onHover: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  type: string;
}

const DndCheckbox: React.FC<DndCheckboxProps> = ({
  children,
  index,
  value,
  onHover,
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

      onHover(dragIndex, hoverIndex);

      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.OPTION, id: value, index },
    collect: (monitor): { [key: string]: boolean } => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} style={{ opacity }}>
      <Row gutter={[0, 12]}>
        <Col xs={24}>
          <Checkbox value={value}>{children}</Checkbox>
        </Col>
      </Row>
    </div>
  );
};

export default DndCheckbox;

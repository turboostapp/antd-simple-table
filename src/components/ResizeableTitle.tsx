import React, { ReactElement } from "react";
import { Resizable } from "react-resizable";
import styled from "styled-components";

const StyledSpan = styled.span`
  position: absolute;
  z-index: 1;
  right: -5px;
  bottom: 0;

  width: 10px;
  height: 100%;

  cursor: col-resize;
`;

const StyledTh = styled.th`
  user-select: none;
`;

const ResizeableTitle = (props): ReactElement => {
  const { onResize, onResizeStop, width, ...restProps } = props;

  if (!width) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <th {...restProps} />;
  }

  return (
    <Resizable
      draggableOpts={{ enableUserSelectHack: false }}
      handle={
        <StyledSpan
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      height={0}
      minConstraints={[80, 0]}
      width={width}
      onResize={onResize}
      onResizeStop={onResizeStop}
    >
      <StyledTh
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
      />
    </Resizable>
  );
};

export default ResizeableTitle;

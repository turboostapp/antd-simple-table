import React, { ReactElement } from "react";
import { Resizable } from "react-resizable";
import styled from "styled-components";

const StyledSpan = styled.span<{ fixed?: string }>`
  position: absolute;
  z-index: 1;
  ${(props): string => (props?.fixed === "right" ? "left" : "right")}: 0;
  bottom: 0;

  width: 10px;
  height: 100%;

  cursor: col-resize;
`;

const StyledTh = styled.th`
  user-select: none;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const ResizeableTitle = (props): ReactElement => {
  const { onResize, onResizeStop, width, fixed, ...restProps } = props;

  if (!width) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <StyledTh {...restProps} />;
  }

  return (
    <Resizable
      draggableOpts={{ enableUserSelectHack: false }}
      handle={
        <StyledSpan
          fixed={fixed}
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
      resizeHandles={fixed === "right" ? ["w"] : ["e"]}
    >
      <StyledTh
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
      />
    </Resizable>
  );
};

export default ResizeableTitle;

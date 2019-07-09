import * as React from 'react';

interface Props {
  children?: JSX.Element | JSX.Element[] | ((id: string) => JSX.Element) | null,
  id: string,
};

const CustomSvgPattern = ({
  children = null,
  id,
}: Props) => {
  return (
    <pattern
      height={1}
      id={id}
      patternContentUnits="objectBoundingBox"
      patternUnits="objectBoundingBox"
      width={1}
    >
      {typeof children === 'function' ? children(id) : children}
    </pattern>
  );
};

export default React.memo(CustomSvgPattern);

import * as React from 'react';

interface Props {
  id: string,
  src?: string
};

const BackgroundImage = ({
  id,
  src = ''
}: Props) => (
  <pattern
    height={1}
    id={id}
    patternContentUnits="objectBoundingBox"
    patternUnits="objectBoundingBox"
    width={1}
  >
    <image
      height={1}
      width={1}
      x={0}
      xlinkHref={src}
      y={0}
    />
  </pattern>
);

export default React.memo(BackgroundImage);

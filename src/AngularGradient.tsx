import * as React from 'react';

import {
  GradientColor,
  SpreadMethod,
  UnprocessedGradientStops,
} from './types';

import { SPREAD_METHOD_PAD } from './constants'
import {
  createAngularGradientPolygons,
  processStops,
} from './utils';

interface Props {
  angle?: number,
  from?: GradientColor,
  id: string,
  scale?: number,
  slices?: number,
  spreadMethod?: SpreadMethod,
  stops?: UnprocessedGradientStops,
  to?: GradientColor,
};

const AngularGradient = ({
  angle = 0,
  from = 'inherit',
  id,
  scale = 1,
  slices = 100,
  stops,
  spreadMethod = SPREAD_METHOD_PAD,
  to = 'inherit',
}: Props) => {
  const gradientStops = React.useMemo(
    () => processStops(stops || ([from, to])),
    [from, to, stops],
  );
  const polygons = React.useMemo(
    () => createAngularGradientPolygons(angle, gradientStops, scale, spreadMethod, slices),
    [angle, gradientStops, scale, spreadMethod, slices]
  );

  return (
    <pattern
      height={1}
      id={id}
      patternUnits="objectBoundingBox"
      patternContentUnits="objectBoundingBox"
      width={1}
    >
      {polygons.map(({ key, fill, points }) => (
        <polygon key={key} fill={fill} points={points} />
      ))}
    </pattern>
  );
};

export default React.memo(AngularGradient);

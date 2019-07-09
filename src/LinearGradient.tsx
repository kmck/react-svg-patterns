import * as React from 'react';

import {
  GradientColor,
  SpreadMethod,
  UnprocessedGradientStops,
} from './types';

import {
  DEGREES_TO_RADIANS,
  SPREAD_METHOD_PAD,
} from './constants'
import { processStops } from './utils';

import GradientStop from './GradientStop';

interface Props {
  angle?: number,
  from?: GradientColor,
  id: string,
  spreadMethod?: SpreadMethod,
  scale?: number,
  stops?: UnprocessedGradientStops,
  to?: GradientColor
};

const LinearGradient = ({
  angle = 0,
  from = 'inherit',
  id,
  scale = 1,
  spreadMethod = SPREAD_METHOD_PAD,
  stops,
  to = 'inherit'
}: Props) => {
  const gradientStops = React.useMemo(
    () => processStops(stops || ([from, to])),
    [from, to, stops],
  );

  // 0 degrees goes bottom-to-top, 90 degrees goes left-to-right, etc.
  const { x1, x2, y1, y2 } = React.useMemo(() => {
    const radians = angle * DEGREES_TO_RADIANS;
    const x = scale * Math.sin(radians);
    const y = scale * Math.cos(radians);
    const xl = Math.max(-x, 0);
    const xr = Math.max(0, x);
    const yl = Math.max(y, 0);
    const yr = Math.max(0, -y);

    // Offset to keep the gradient centered
    const xRange = Math.abs(xr - xl);
    const yRange = Math.abs(yr - yl);
    const xo = 0.5 * (1 - xRange);
    const yo = 0.5 * (1 - yRange);

    return {
      x1: xl + xo,
      x2: xr + xo,
      y1: yl + yo,
      y2: yr + yo,
    };
  }, [angle]);

  return (
    <linearGradient
      id={id}
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
      spreadMethod={spreadMethod}
    >
      {gradientStops.map((stopProps, key) => (
        <GradientStop
          key={stopProps.offset != null ? stopProps.offset : key}
          {...stopProps}
        />
      ))}
    </linearGradient>
  );
};

export default React.memo(LinearGradient);

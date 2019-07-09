import * as React from 'react';

import {
  GradientColor,
  SpreadMethod,
  UnprocessedGradientStops,
} from './types';

import { SPREAD_METHOD_PAD } from './constants';
import { processStops } from './utils';

import GradientStop from './GradientStop';

interface Props {
  cx?: number,
  cy?: number,
  from?: GradientColor,
  fx?: number,
  fy?: number,
  id: string,
  r?: number,
  spreadMethod?: SpreadMethod,
  stops?: UnprocessedGradientStops,
  to?: GradientColor
};

const RadialGradient = ({
  cx = 0.5,
  cy = 0.5,
  from = 'inherit',
  fx = 0.5,
  fy = 0.5,
  id,
  r = 0.5,
  spreadMethod = SPREAD_METHOD_PAD,
  stops,
  to = 'inherit',
}: Props) => {
  const gradientStops = React.useMemo(
    () => processStops(stops || ([from, to])),
    [from, to, stops],
  );

  return (
    <radialGradient
      id={id}
      cx={cx}
      cy={cy}
      fx={fx}
      fy={fy}
      r={r}
      spreadMethod={spreadMethod}
    >
      {gradientStops.map((stopProps, key) => (
        <GradientStop
          key={stopProps.offset != null ? stopProps.offset : key}
          {...stopProps}
        />
      ))}
    </radialGradient>
  );
};

export default React.memo(RadialGradient);

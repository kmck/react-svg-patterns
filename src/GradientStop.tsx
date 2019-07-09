import * as React from 'react';

import { forcePercent } from './utils';

interface Props {
  color: string,
  offset: string | number
};

const GradientStop = ({
  offset,
  color,
}: Props) => {
  return <stop offset={forcePercent(offset)} stopColor={color} />;
};

export default React.memo(GradientStop);

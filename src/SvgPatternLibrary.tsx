import * as React from 'react';

import { SvgPatterns } from './types';

import {
  PATTERN_TYPE_ANGULAR_GRADIENT,
  PATTERN_TYPE_CUSTOM,
  PATTERN_TYPE_IMAGE,
  PATTERN_TYPE_LINEAR_GRADIENT,
  PATTERN_TYPE_RADIAL_GRADIENT,
} from './constants';

import LinearGradient from './LinearGradient';
import RadialGradient from './RadialGradient';
import AngularGradient from './AngularGradient';
import BackgroundImage from './BackgroundImage';
import CustomSvgPattern from './CustomSvgPattern';

interface Props {
  patterns?: SvgPatterns,
  noSvgWrapper?: boolean,
};

const SvgPatternLibrary = ({
  patterns = {},
  noSvgWrapper = false,
}: Props) => {
  const renderedPatterns = React.useMemo(
    () => Object.entries(patterns as SvgPatterns)
      .map(([key, { id, props, type }]) => {
        switch (type) {
          case PATTERN_TYPE_LINEAR_GRADIENT:
            return (
              <LinearGradient key={key} id={id} {...props} />
            );
          case PATTERN_TYPE_RADIAL_GRADIENT:
            return (
              <RadialGradient key={key} id={id} {...props} />
            );
          case PATTERN_TYPE_ANGULAR_GRADIENT:
            return (
              <AngularGradient key={key} id={id} {...props} />
            );
          case PATTERN_TYPE_IMAGE:
            return (
              <BackgroundImage key={key} id={id} {...props} />
            );
          case PATTERN_TYPE_CUSTOM:
            return (
              <CustomSvgPattern key={key} id={id} {...props} />
            );
          default:
            return null;
        }
      }),
    [patterns]
  );

  if (noSvgWrapper) {
    return (
      <>
        {renderedPatterns}
      </>
    );
  }

  return (
    <svg
      style={{
        bottom: 0,
        height: 1,
        opacity: 0,
        pointerEvents: 'none',
        position: 'fixed',
        right: 0,
        width: 1,
        zIndex: -1
      }}
    >
      {renderedPatterns}
    </svg>
  );
};

export default React.memo(SvgPatternLibrary);

import {
  PATTERN_TYPE_ANGULAR_GRADIENT,
  PATTERN_TYPE_CUSTOM,
  PATTERN_TYPE_IMAGE,
  PATTERN_TYPE_LINEAR_GRADIENT,
  PATTERN_TYPE_RADIAL_GRADIENT,
  SPREAD_METHOD_PAD,
  SPREAD_METHOD_REFLECT,
  SPREAD_METHOD_REPEAT,
} from './constants';

export type SpreadMethod = (
  typeof SPREAD_METHOD_PAD
  | typeof SPREAD_METHOD_REFLECT
  | typeof SPREAD_METHOD_REPEAT
);

export type GradientColor = string;
export type GradientStop = {
  offset: number,
  color: GradientColor,
};

export type UnprocessedGradientStops = (GradientColor | GradientStop)[];
export type GradientStops = GradientStop[];

export type PatternType = (
  typeof PATTERN_TYPE_ANGULAR_GRADIENT
  | typeof PATTERN_TYPE_CUSTOM
  | typeof PATTERN_TYPE_IMAGE
  | typeof PATTERN_TYPE_LINEAR_GRADIENT
  | typeof PATTERN_TYPE_RADIAL_GRADIENT
);

export type SvgPatternData = {
  id: string,
  key?: string,
  props?: { [key: string]: unknown },
  type: PatternType,
};

export type SvgPatterns = {
  [key: string]: SvgPatternData
};
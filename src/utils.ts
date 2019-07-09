import rgbHex from 'rgb-hex';
import hexRgb from 'hex-rgb';

import {
  GradientColor,
  GradientStops,
  SpreadMethod,
  UnprocessedGradientStops,
} from './types';

import {
  DEGREES_TO_RADIANS,
  SPREAD_METHOD_PAD,
  SPREAD_METHOD_REFLECT,
  SPREAD_METHOD_REPEAT,
} from './constants';

function safeHexRgb(color: string) {
  try {
    return hexRgb(color);
  } catch (e) {
    return {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0,
    };
  }
}

export const sanitizeKey = (key: string) => key.replace(/\s/g, '-');
export const forcePercent = (num: number | string) => (typeof num === 'number' ? `${num * 100}%` : num);
export function sortBy<T>(arr: Array<T>, key: string): T[] {
  function comparator(a: { [key: string]: any }, b: { [key: string]: any }) {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  }
  return [...arr].sort(comparator);
}

export function angleToPoint(angle: number): [number, number] {
  const x = 0.5 + Math.sin(angle * DEGREES_TO_RADIANS);
  const y = 0.5 - Math.cos(angle * DEGREES_TO_RADIANS);
  return [x, y];
}

export function mixColors(
  color1: string,
  color2: string,
  amount: number = 0.5,
) {
  const { red: r1, green: g1, blue: b1, alpha: a1 } = safeHexRgb(color1);
  const { red: r2, green: g2, blue: b2, alpha: a2 } = safeHexRgb(color2);

  const w = (2 * amount) - 1;
  const aDiff = a2 - a1;

  const w2 = ((w * aDiff === -1 ? w : (w + aDiff) / (1 + w * aDiff)) + 1) / 2.0;
  const w1 = 1 - w2;

  const r = Math.round(w1 * r1 + w2 * r2);
  const g = Math.round(w1 * g1 + w2 * g2);
  const b = Math.round(w1 * b1 + w2 * b2);
  const a = (a1 * amount) + (a2 * (1 - amount));

  return `#${a < 1 ? rgbHex(r, g, b, a) : rgbHex(r, g, b)}`;
}

export function createGetColor(
  stops: GradientStops,
  scale: number = 1,
  spreadMethod: SpreadMethod = SPREAD_METHOD_PAD,
) {
  const sortedColors = sortBy(stops, 'offset');
  const firstStop = sortedColors[0];
  const lastStop = sortedColors[sortedColors.length - 1];
  const sortedColorsLength = sortedColors.length;
  const findLeftStop = (offset: number) => {
    for (let i = sortedColorsLength - 1; i >= 0; i -= 1) {
      if (offset >= sortedColors[i].offset) {
        return sortedColors[i];
      }
    }
    return undefined;
  };
  const findRightStop = (offset: number) => {
    for (let i = 0; i < sortedColorsLength; i += 1) {
      if (offset <= sortedColors[i].offset) {
        return sortedColors[i];
      }
    }
    return undefined;
  };

  const cache = new Map<number, GradientColor>();

  return (offset: number): GradientColor => {
    if (cache.has(offset)) {
      return cache.get(offset) as GradientColor;
    }

    let i = offset / scale;
    if (i < 0 || i > 1) {
      switch (spreadMethod) {
        case SPREAD_METHOD_REFLECT:
          i = Math.abs(i) % 2;
          if (Math.floor(i) === 1) {
            i = -i;
          }
          i %= 1;
          if (i < 0) {
            i += 1;
          }
          break;
        case SPREAD_METHOD_REPEAT:
          if (i !== 0) {
            i %= 1;
          }
          if (i <= 0 && offset) {
            i += 1;
          }
          break;
        case SPREAD_METHOD_PAD:
        default:
          break;
      }
    }
    [].find
    const leftStop = findLeftStop(i) || firstStop;
    const rightStop = findRightStop(i) || lastStop;
    const amount = (rightStop.offset !== leftStop.offset)
      ? (i - leftStop.offset) / (rightStop.offset - leftStop.offset)
      : 1;
    const color = mixColors(leftStop.color, rightStop.color, amount);
    cache.set(offset, color);
    return color;
  };
}

export function createAngularGradientPolygons(
  angle: number,
  stops: GradientStops,
  scale: number,
  spreadMethod: SpreadMethod,
  slices: number,
) {
  const getColor = createGetColor(stops, scale, spreadMethod);
  const numPoints = Math.ceil(8 / slices);
  const pointDistance = 1 / slices / numPoints;
  return (new Array(slices)).fill(0)
    .map((_0, slice: number) => {
      const color = getColor(slices > 1 ? slice / (slices - 1) : 0);
      const start = slice / slices;
      const pointsForSlice = slice === slices - 1 ? numPoints + 2 : numPoints + 3
      const points: ([number, number])[] = (new Array(pointsForSlice)).fill(0)
        .map((_0, i) => {
          if (!i) {
            return [0.5, 0.5];
          }
          const offset = pointDistance * (i - 1);
          return angleToPoint((360 * (start + offset)) + angle);
        });
      return {
        key: start,
        fill: color,
        points: points.map(point => point.join(',')).join(' '),
      };
    });
}

export function processStops(
  stops: UnprocessedGradientStops,
): GradientStops {
  let wasProcessed = false;
  const numStops = stops.length;
  const processedStops = stops.map((stop, i) => {
    if (typeof stop !== 'object' || stop.offset == null) {
      wasProcessed = true;
      return {
        offset: i / (numStops - 1),
        color: typeof stop === 'object' ? stop.color : stop
      };
    }
    return stop;
  });
  return wasProcessed ? processedStops: (stops as GradientStops);
}

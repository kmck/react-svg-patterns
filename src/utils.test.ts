import {
  SPREAD_METHOD_PAD,
  SPREAD_METHOD_REFLECT,
  SPREAD_METHOD_REPEAT,
} from './constants';

import {
  sanitizeKey,
  forcePercent,
  sortBy,
  angleToPoint,
  mixColors,
  createGetColor,
  createAngularGradientPolygons,
  processStops,
} from './utils';

describe('sanitizeKey', () => {
  it('converts whitespace to dashes', () => {
    expect(sanitizeKey('myString')).toBe('myString');
    expect(sanitizeKey('my string')).toBe('my-string');
    expect(sanitizeKey(' whitespace ')).toBe('-whitespace-');
  });
});

describe('forcePercent', () => {
  it('converts a number to a percent', () => {
    expect(forcePercent(0)).toBe('0%');
    expect(forcePercent(0.25)).toBe('25%');
    expect(forcePercent(0.5)).toBe('50%');
    expect(forcePercent(1)).toBe('100%');
    expect(forcePercent(1.2)).toBe('120%');
    expect(forcePercent(-2)).toBe('-200%');
  });

  it('does not modify', () => {
    expect(forcePercent('0%')).toBe('0%');
    expect(forcePercent('25%')).toBe('25%');
    expect(forcePercent('50%')).toBe('50%');
    expect(forcePercent('100%')).toBe('100%');
    expect(forcePercent('01%')).toBe('01%');
  });
});

describe('sortBy', () => {
  it('sorts by the specified field', () => {
    const resultActual = sortBy([
      { value: 5 },
      { value: 1 },
      { value: 5, duplicate: 1 },
      { value: 2 },
      { value: 1, duplicate: 1 },
      { value: 1, duplicate: 2 },
    ], 'value');
    const resultExpected = [
      { value: 1 },
      { value: 1, duplicate: 1 },
      { value: 1, duplicate: 2 },
      { value: 2 },
      { value: 5 },
      { value: 5, duplicate: 1 },
    ];
    expect(resultActual).toEqual(resultExpected)
  });
});

describe('angleToPoint', () => {
  const _r = (values: number[]) => values.map(v => Math.round(v * 1000))

  it('converts an angle in degrees to [x, y]', () => {
    expect(_r(angleToPoint(0))).toEqual(_r([0.5, -0.5]));
    expect(_r(angleToPoint(30))).toEqual(_r([1, -0.366]));
    expect(_r(angleToPoint(45))).toEqual(_r([1.207, -0.207]));
    expect(_r(angleToPoint(90))).toEqual(_r([1.5, 0.5]));
    expect(_r(angleToPoint(180))).toEqual(_r([0.5, 1.5]));
    expect(_r(angleToPoint(270))).toEqual(_r([-0.5, 0.5]));
    expect(_r(angleToPoint(360))).toEqual(_r([0.5, -0.5]));
  });

  it('converts a negative angle in degrees to [x, y]', () => {
    expect(_r(angleToPoint(-90))).toEqual(_r([-0.5, 0.5]));
    expect(_r(angleToPoint(-180))).toEqual(_r([0.5, 1.5]));
    expect(_r(angleToPoint(-315))).toEqual(_r([1.207, -0.207]));
    expect(_r(angleToPoint(-270))).toEqual(_r([1.5, 0.5]));
    expect(_r(angleToPoint(-330))).toEqual(_r([1, -0.366]));
    expect(_r(angleToPoint(-360))).toEqual(_r([0.5, -0.5]));
  });
});

describe('mixColors', () => {
  it('mixes colors in the specified proportions', () => {
    expect(mixColors('#000000', '#ffffff')).toBe('#808080');
    expect(mixColors('#000000', '#ffffff', 0)).toBe('#000000');
    expect(mixColors('#000000', '#ffffff', 1)).toBe('#ffffff');
    expect(mixColors('#ff0000', '#0000ff', 0.8)).toBe('#3300cc');
  });

  it('mixes colors with an alpha component', () => {
    expect(mixColors('#ff0000ff', '#00ff00ff')).toBe('#808000');
    expect(mixColors('#ff000080', '#00ff0080')).toBe('#80800080');
    expect(mixColors('#66990000', '#00ff00ff')).toBe('#00ff0080');
    expect(mixColors('#ff0000ff', '#00ff00cc', 0.25)).toBe('#d12e00d9');
  });

  it('accepts color shorthand', () => {
    expect(mixColors('#000', '#fff')).toBe('#808080');
    expect(mixColors('#000', '#fff', 0)).toBe('#000000');
    expect(mixColors('#000', '#fff', 1)).toBe('#ffffff');
    expect(mixColors('#f00', '#00f', 0.8)).toBe('#3300cc');
  });
});

describe('createGetColor', () => {
  const stops = [
    { offset: 0, color: '#ff0000' },
    { offset: 0.5, color: '#00ff00' },
    { offset: 1, color: '#0000ff' },
  ];

  it('returns the exact value at stops', () => {
    const getColor = createGetColor(stops);
    expect(typeof getColor).toBe('function');
    expect(getColor(0)).toBe('#ff0000');
    expect(getColor(0.5)).toBe('#00ff00');
    expect(getColor(1)).toBe('#0000ff');
  });

  it('interpolates the value between stops', () => {
    const getColor = createGetColor(stops);
    expect(typeof getColor).toBe('function');
    expect(getColor(0.25)).toBe('#808000');
    expect(getColor(0.75)).toBe('#008080');
  });

  it('respects the "pad" spread method', () => {
    const getColor = createGetColor(stops, 1, SPREAD_METHOD_PAD);
    expect(typeof getColor).toBe('function');
    expect(getColor(-0.25)).toBe('#ff0000');
    expect(getColor(1.25)).toBe('#0000ff');
  });

  it('respects the "reflect" spread method', () => {
    const getColor = createGetColor(stops, 1, SPREAD_METHOD_REFLECT);
    expect(typeof getColor).toBe('function');
    expect(getColor(-0.25)).toBe('#808000');
    expect(getColor(1.25)).toBe('#008080');
  });

  it('respects the "repeat" spread method', () => {
    const getColor = createGetColor(stops, 1, SPREAD_METHOD_REPEAT);
    expect(typeof getColor).toBe('function');
    expect(getColor(-0.25)).toBe('#008080');
    expect(getColor(1.25)).toBe('#808000');
  });
});

describe('createAngularGradientPolygons', () => {
  it('creates polygons for an angular gradient', () => {
    const polygons = createAngularGradientPolygons(
      0,
      [{ offset: 0, color: '#ffffff' }, { offset: 1, color: '#000000' }],
      1,
      SPREAD_METHOD_PAD,
      8
    );
    expect(polygons).toMatchSnapshot();
  });

  it('creates polygons for tiny slices', () => {
    const polygons = createAngularGradientPolygons(
      0,
      [{ offset: 0, color: '#ff0000' }, { offset: 0.5, color: '#00ff00' }, { offset: 1, color: '#0000ff' }],
      1,
      SPREAD_METHOD_PAD,
      3
    );
    expect(polygons).toMatchSnapshot();
  });
});

describe('processStops', () => {
  it('processes an array of color values', () => {
    const stops = ['#ff0000', '#00ff00', '#0000ff'];
    const resultActual = processStops(stops);
    const resultExpected = [
      { offset: 0, color: '#ff0000' },
      { offset: 0.5, color: '#00ff00' },
      { offset: 1, color: '#0000ff' },
    ];
    expect(resultActual).toEqual(resultExpected);
  });

  it('processes a mixed array of color values and stops', () => {
    const stops = ['#ff0000', { offset: 0.5, color: '#00ff00' }, '#0000ff'];
    const resultActual = processStops(stops);
    const resultExpected = [
      { offset: 0, color: '#ff0000' },
      { offset: 0.5, color: '#00ff00' },
      { offset: 1, color: '#0000ff' },
    ];
    expect(resultActual).toEqual(resultExpected);
  });

  it('returns the input when processing is unnecessary', () => {
    const stops = [
      { offset: 0, color: '#ff0000' },
      { offset: 0.5, color: '#00ff00' },
      { offset: 1, color: '#0000ff' },
    ];
    const resultActual = processStops(stops);
    const resultExpected = stops;
    expect(resultActual).toEqual(resultExpected);
    expect(resultActual).toBe(resultExpected);
  });
});

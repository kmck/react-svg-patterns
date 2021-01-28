import * as React from 'react';
import renderer from 'react-test-renderer';

import createManagedSvgPatternLibrary from './createManagedSvgPatternLibrary';

type CreateManagedSvgPatternLibraryReturn = ReturnType<typeof createManagedSvgPatternLibrary>;

describe('createManagedSvgPatternLibrary', () => {
  let ManagedSvgPatternLibrary: CreateManagedSvgPatternLibraryReturn['ManagedSvgPatternLibrary'];
  let getSvgPattern: CreateManagedSvgPatternLibraryReturn['getSvgPattern'];
  let registerSvgPattern: CreateManagedSvgPatternLibraryReturn['registerSvgPattern'];
  let useSvgPattern: CreateManagedSvgPatternLibraryReturn['useSvgPattern'];

  beforeEach(() => {
    ({
      ManagedSvgPatternLibrary,
      getSvgPattern,
      registerSvgPattern,
      useSvgPattern,
    } = createManagedSvgPatternLibrary('testManager'));
  });

  describe('registerSvgPattern', () => {
    it('returns the identifier of the registered pattern', () => {
      const valueActual = registerSvgPattern('test', 'linear', { from: '#f00', to: '#00f' });
      const valueExpected = 'url(#testManager-linear__test)';
      expect(valueActual).toBe(valueExpected);
    });

    it('converts whitespace to dashes', () => {
      const valueActual = registerSvgPattern('extra space', 'linear', { from: '#f00', to: '#00f' });
      const valueExpected = 'url(#testManager-linear__extra-space)';
      expect(valueActual).toBe(valueExpected);
    });
  });

  describe('getSvgPattern', () => {
    it('returns the identifier of a registered pattern', () => {
      registerSvgPattern('test', 'linear', { from: '#f00', to: '#00f' });
      const valueActual = getSvgPattern('test');
      expect(valueActual).toBe('url(#testManager-linear__test)');
    });

    it('returns null when the key is not registered', () => {
      expect(getSvgPattern('miss')).toBeUndefined();
    });

    it('matches the identifier returned by registerSvgPattern', () => {
      const valueExpected = registerSvgPattern('my cool gradient', 'linear', { from: '#f00', to: '#00f' });
      const valueActual = getSvgPattern('my cool gradient');
      expect(valueActual).toBe(valueExpected);
    });
  });

  describe('ManagedSvgPatternLibrary', () => {
    it('renders with no fills', () => {
      const tree = renderer.create(
        <ManagedSvgPatternLibrary />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders with all fill types', () => {
      registerSvgPattern('test1', 'linear', { from: '#f00', to: '#00f' });
      registerSvgPattern('test2', 'radial', { from: '#f00', to: '#00f' });
      registerSvgPattern('test3', 'angular', { from: '#f00', to: '#00f', slices: 4 });
      registerSvgPattern('test4', 'image', { src: 'https://via.placeholder.com/150' });
      registerSvgPattern('test5', 'custom', { children: () => <rect x={0} y={0} width={1} height={1} fill="#f00" /> });
      const tree = renderer.create(
        <ManagedSvgPatternLibrary />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders without an SVG wrapper', () => {
      registerSvgPattern('test1', 'linear', { from: '#f00', to: '#00f' });
      registerSvgPattern('test2', 'radial', { from: '#f00', to: '#00f' });
      const tree = renderer.create(
        <ManagedSvgPatternLibrary noSvgWrapper />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('useSvgPattern', () => {
    it('renders with all fill types', () => {
      const FillTest = () => {
        const testFill1 = useSvgPattern('test1', 'linear', { from: '#f00', to: '#00f' });
        const testFill2 = useSvgPattern('test2', 'radial', { from: '#f00', to: '#00f' });
        const testFill3 = useSvgPattern('test3', 'angular', { from: '#f00', to: '#00f', slices: 4 });
        const testFill4 = useSvgPattern('test4', 'image', { src: 'https://via.placeholder.com/150' });
        const testFill5 = useSvgPattern('test5', 'custom', { children: () => <rect x={0} y={0} width={1} height={1} fill="#f00" /> });
        return (
          <svg
            width={100}
            height={100}
            viewBox="0 0 100 100"
          >
            <rect x={0} y={0} width={100} height={20} fill={testFill1} />
            <rect x={0} y={20} width={100} height={20} fill={testFill2} />
            <rect x={0} y={40} width={100} height={20} fill={testFill3} />
            <rect x={0} y={60} width={100} height={20} fill={testFill4} />
            <rect x={0} y={80} width={100} height={20} fill={testFill5} />
          </svg>
        );
      };
      const tree = renderer.create(
        <>
          <FillTest />
          <ManagedSvgPatternLibrary />
        </>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});

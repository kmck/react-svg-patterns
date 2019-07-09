import * as React from 'react';
import renderer from 'react-test-renderer';

import CustomSvgPattern from './CustomSvgPattern';

describe('CustomSvgPattern', () => {
  it('renders a custom SVG pattern', () => {
    const tree = renderer.create(
      <CustomSvgPattern id="test" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a custom SVG pattern with a single child', () => {
    const tree = renderer.create(
      <CustomSvgPattern id="test">
        <rect x={0} y={0} width={1} height={1} fill="#00f" />
      </CustomSvgPattern>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a custom SVG pattern with multiple children', () => {
    const tree = renderer.create(
      <CustomSvgPattern id="test">
        <rect x={0} y={0} width={1} height={1} fill="#ff0" />
        <rect x={0} y={0} width={0.5} height={0.5} fill="#f00" />
        <rect x={0.5} y={0.5} width={0.5} height={0.5} fill="#f00" />
      </CustomSvgPattern>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a custom SVG pattern with a render prop', () => {
    const tree = renderer.create(
      <CustomSvgPattern id="test">
        {id => (
          <g>
            <rect x={0} y={0} width={1} height={1} fill="#ff0" />
            <rect x={0} y={0} width={0.5} height={0.5} fill="#f00" />
            <rect x={0.5} y={0.5} width={0.5} height={0.5} fill="#f00" />
            <text>{id}</text>
          </g>
        )}
      </CustomSvgPattern>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

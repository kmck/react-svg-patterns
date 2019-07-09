import * as React from 'react';
import renderer from 'react-test-renderer';

import RadialGradient from './RadialGradient';

describe('LineraGradient', () => {
  it('renders a radial gradient', () => {
    const tree = renderer.create(
      <RadialGradient id="test" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a radial gradient using from/to', () => {
    const tree = renderer.create(
      <RadialGradient id="test" from="#ff0000" to="#0000ff" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a radial gradient using unprocessed stops', () => {
    const tree = renderer.create(
      <RadialGradient id="test" stops={['#ff0000', '#00ff00', '#0000ff']} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a radial gradient using preprocessed stops', () => {
    const tree = renderer.create(
      <RadialGradient id="test" stops={[{ offset: 0.25, color: '#000' }, { offset: 0.75, color: '#fff' }]} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a radial gradient with a radius', () => {
    const tree = renderer.create(
      <RadialGradient id="test" from="#fff" to="#000" r={2} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).not.toEqual(renderer.create(
      <RadialGradient id="test" from="#fff" to="#000" />
    ).toJSON());
  });

  it('renders a radial gradient with a center offset', () => {
    const tree = renderer.create(
      <RadialGradient id="test" from="#fff" to="#000" cx={0.25} cy={0.75} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).not.toEqual(renderer.create(
      <RadialGradient id="test" from="#fff" to="#000" />
    ).toJSON());
  });

  it('renders a radial gradient with a focus offset', () => {
    const tree = renderer.create(
      <RadialGradient id="test" from="#fff" to="#000" fx={0.25} fy={0.75} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).not.toEqual(renderer.create(
      <RadialGradient id="test" from="#fff" to="#000" />
    ).toJSON());
  });

  it('renders a radial gradient with spreadMethod', () => {
    const tree = renderer.create(
      <>
        <RadialGradient id="test1" from="#fff" to="#000" spreadMethod="pad" />
        <RadialGradient id="test2" from="#fff" to="#000" spreadMethod="reflect" />
        <RadialGradient id="test3" from="#fff" to="#000" spreadMethod="repeat" />
      </>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

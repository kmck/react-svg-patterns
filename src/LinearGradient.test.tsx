import * as React from 'react';
import renderer from 'react-test-renderer';

import LinearGradient from './LinearGradient';

describe('LineraGradient', () => {
  it('renders a linear gradient', () => {
    const tree = renderer.create(
      <LinearGradient id="test" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a linear gradient using from/to', () => {
    const tree = renderer.create(
      <LinearGradient id="test" from="#ff0000" to="#0000ff" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a linear gradient using unprocessed stops', () => {
    const tree = renderer.create(
      <LinearGradient id="test" stops={['#ff0000', '#00ff00', '#0000ff']} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a linear gradient using preprocessed stops', () => {
    const tree = renderer.create(
      <LinearGradient id="test" stops={[{ offset: 0.25, color: '#000' }, { offset: 0.75, color: '#fff' }]} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a linear gradient at an angle', () => {
    const tree = renderer.create(
      <LinearGradient id="test" from="#fff" to="#000" angle={45} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).not.toEqual(renderer.create(
      <LinearGradient id="test" from="#fff" to="#000" />
    ).toJSON());
  });

  it('renders a linear gradient with spreadMethod', () => {
    const tree = renderer.create(
      <>
        <LinearGradient id="test1" from="#fff" to="#000" spreadMethod="pad" />
        <LinearGradient id="test2" from="#fff" to="#000" spreadMethod="reflect" />
        <LinearGradient id="test3" from="#fff" to="#000" spreadMethod="repeat" />
      </>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a linear gradient with scale', () => {
    const tree = renderer.create(
      <LinearGradient id="test" from="#fff" to="#000" scale={2} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).not.toEqual(renderer.create(
      <LinearGradient id="test" from="#fff" to="#000" />
    ).toJSON());
  });
});

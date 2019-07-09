import * as React from 'react';
import renderer from 'react-test-renderer';

import AngularGradient from './AngularGradient';

describe('AngularGradient', () => {
  it('renders an angular gradient using from/to', () => {
    const tree = renderer.create(
      <AngularGradient id="test" from="#ff0000" to="#0000ff" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an angular gradient using unprocessed stops', () => {
    const tree = renderer.create(
      <AngularGradient id="test" stops={['#ff0000', '#00ff00', '#0000ff']} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an angular gradient using preprocessed stops', () => {
    const tree = renderer.create(
      <AngularGradient id="test" stops={[{ offset: 0.25, color: '#000' }, { offset: 0.75, color: '#fff' }]} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an angular gradient at an angle', () => {
    const tree = renderer.create(
      <AngularGradient id="test" from="#fff" to="#000" angle={45} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).not.toEqual(renderer.create(
      <AngularGradient id="test" from="#fff" to="#000" />
    ).toJSON());
  });

  it('renders an angular gradient with the specified number of slices', () => {
    const treeSlices3 = renderer.create(
      <AngularGradient id="test" from="#fff" to="#000" slices={3} />
    ).toJSON();
    const treeSlices16 = renderer.create(
      <AngularGradient id="test" from="#fff" to="#000" slices={16} />
    ).toJSON();

    expect(treeSlices3).toMatchSnapshot();
    expect(treeSlices16).toMatchSnapshot();
    expect(treeSlices3).not.toEqual(treeSlices16);
  });

  it('renders an angular gradient with scale', () => {
    const tree = renderer.create(
      <AngularGradient id="test" from="#fff" to="#000" scale={2} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).not.toEqual(renderer.create(
      <AngularGradient id="test" from="#fff" to="#000" />
    ).toJSON());
  });

  it('renders an angular gradient with scale and spreadMethod', () => {
    const treeSpreadMethodPad = renderer.create(
      <AngularGradient id="test1" from="#fff" to="#000" scale={0.5} spreadMethod="pad" />
    ).toJSON();
    const treeSpreadMethodReflect = renderer.create(
      <AngularGradient id="test2" from="#fff" to="#000" scale={0.5} spreadMethod="reflect" />
    ).toJSON();
    const treeSpreadMethodRepeat = renderer.create(
      <AngularGradient id="test3" from="#fff" to="#000" scale={0.5} spreadMethod="repeat" />
    ).toJSON();

    expect(treeSpreadMethodPad).toMatchSnapshot();
    expect(treeSpreadMethodReflect).toMatchSnapshot();
    expect(treeSpreadMethodRepeat).toMatchSnapshot();

    expect(treeSpreadMethodPad).not.toEqual(treeSpreadMethodReflect);
    expect(treeSpreadMethodPad).not.toEqual(treeSpreadMethodRepeat);
    expect(treeSpreadMethodReflect).not.toEqual(treeSpreadMethodRepeat);
  });
});

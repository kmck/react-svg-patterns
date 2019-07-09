import * as React from 'react';
import renderer from 'react-test-renderer';

import BackgroundImage from './BackgroundImage';

describe('BackgroundImage', () => {
  it('renders a background image pattern', () => {
    const tree = renderer.create(
      <BackgroundImage id="test" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a background image pattern with the specified src', () => {
    const tree = renderer.create(
      <BackgroundImage id="test" src="https://via.placeholder.com/150" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

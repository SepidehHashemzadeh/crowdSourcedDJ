// Link.react-test.js
import React from 'react';
import ControlledTabs from '../components/ControlledTabs.jsx';
import renderer from 'react-test-renderer';

test('Buttons toggle view correctly', () => {
  const component = renderer.create(
    <ControlledTabs page="http://www.facebook.com">Facebook</ControlledTabs>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

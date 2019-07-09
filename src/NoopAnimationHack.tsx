import * as React from 'react';

function needsAnimationHack(UA: string) {
  return /Safari/.test(UA) && !/Chrome/.test(UA);
}

const NoopAnimationHack = () => {
  const UA = window.navigator.userAgent;
  const needsHack = React.useMemo(() => needsAnimationHack(UA), [UA]);

  return !needsHack ? null : (
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="translate"
      from="0, 0" to="0, 0"
      dur="1s"
      repeatCount="indefinite"
    />
  );
};

export default NoopAnimationHack;

import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';

import { NoopAnimationHack } from 'react-svg-patterns';

const SvgPatternPreview = ({ ...props }) => {
  const localPatternId = useMemo(() => `pattern-${Math.random().toString().substr(2)}`, []);
  const [local, setLocal] = useState(false);
  const handleClick = useCallback(() => {
    setLocal(value => !value);
  }, []);

  return (
    <svg
      height={100}
      onClick={handleClick}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      width={100}
      {...props}
    >
      {!local ? null : (
        <defs>
          <pattern
            id={localPatternId}
            x={0}
            y={0}
            width="100%"
            height="100%"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <rect fill="inherit" x={0} y={0} width="100%" height="100%" />
          </pattern>
        </defs>
      )}
      <NoopAnimationHack />
      <g fill={!local ? 'inherit' : `url(#${localPatternId})`}>
        <rect x={5} y={5} width={90} height={90} />
      </g>
    </svg>
  );
}

export default SvgPatternPreview;

import * as React from 'react';

import { PatternType } from './types';

import SvgPatternLibrary from './SvgPatternLibrary';
import SvgPatternManager from './SvgPatternManager';

interface Props {
  noSvgWrapper?: boolean;
}

export default function createManagedSvgPatternLibrary(
  patternManagerOrId?: string | SvgPatternManager
) {
  const patternManager =
    (patternManagerOrId as any) instanceof SvgPatternManager
      ? (patternManagerOrId as SvgPatternManager)
      : new SvgPatternManager(patternManagerOrId as string);
  const ManagedSvgPatternLibrary = (props: Props) => {
    const [patterns, setPatterns] = React.useState(patternManager.getPatterns());

    React.useEffect(() => {
      setPatterns(patternManager.getPatterns());

      const unsubscribe = patternManager.subscribe(() => {
        setPatterns(patternManager.getPatterns());
      });

      return () => {
        unsubscribe();
      };
    }, []);

    return <SvgPatternLibrary patterns={patterns} {...props} />;
  };

  return {
    ManagedSvgPatternLibrary,
    getSvgPattern(key: string) {
      return patternManager.get(key);
    },
    registerSvgPattern(key: string, type: PatternType, params: Object) {
      return patternManager.get(patternManager.add(key, type, params));
    },
    useSvgPattern(key: string, type: PatternType, params: Object) {
      const [pattern, setPattern] = React.useState<string | undefined>(undefined);
      React.useLayoutEffect(() => {
        setPattern(patternManager.get(patternManager.add(key, type, params)));
      }, [key, type, params]);
      return pattern;
    },
  };
}

import * as React from 'react';

import { PatternType } from './types';

import SvgPatternLibrary from './SvgPatternLibrary';
import SvgPatternManager from './SvgPatternManager';

interface Props {
  noSvgWrapper?: boolean;
}

let svgPatternIndex = 0;

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

  function getSvgPattern(key: string) {
    return patternManager.get(key);
  }

  function registerSvgPattern(key: string, type: PatternType, params: Object) {
    return patternManager.get(patternManager.add(key, type, params));
  }

  function useSvgPattern(explicitKey: string | undefined, type: PatternType, params: Object) {
    const key = React.useMemo(() => explicitKey || `P_${++svgPatternIndex}`, [explicitKey]);
    const [pattern, setPattern] = React.useState<string | undefined>(undefined);
    React.useLayoutEffect(() => {
      setPattern(patternManager.get(patternManager.add(key, type, params)));
      return () => {
        patternManager.remove(key);
      };
    }, [key, type, params]);
    return pattern;
  }

  function useOptionalKeySvgPattern(
    key: string,
    type: PatternType,
    params: Object
  ): string | undefined;
  function useOptionalKeySvgPattern(type: PatternType, params: Object): string | undefined;
  function useOptionalKeySvgPattern(
    key: string | PatternType,
    type: PatternType | Object,
    params?: Object
  ) {
    return typeof params === 'undefined'
      ? useSvgPattern(undefined, key as PatternType, type as Object)
      : useSvgPattern(key, type as PatternType, params);
  }

  return {
    ManagedSvgPatternLibrary,
    getSvgPattern,
    registerSvgPattern,
    useSvgPattern: useOptionalKeySvgPattern,
  };
}

import { PatternType } from './types';

import SvgPatternManager from './SvgPatternManager';

export default function createSvgPatternManager(idPrefix?: string) {
  const patternManager = new SvgPatternManager(idPrefix);
  return {
    getInstance() {
      return patternManager;
    },
    getSvgPattern(key: string) {
      return patternManager.get(key);
    },
    registerSvgPattern(key: string, type: PatternType, params: Object) {
      return patternManager.get(patternManager.add(key, type, params));
    }
  };
}

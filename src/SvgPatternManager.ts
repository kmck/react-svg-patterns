import {
  PatternType,
  SvgPatternData,
} from './types';
import { sanitizeKey } from './utils';

export default class SvgPatternManager {
  private idPrefix: string;
  private patterns: Map<string, SvgPatternData> = new Map();
  private listeners: Set<Function> = new Set();

  public constructor(idPrefix = 'svg-pattern') {
    this.idPrefix = idPrefix;
  }

  private dispatch() {
    this.listeners.forEach(listener => {
      listener();
    });
  }

  public subscribe = (listener: Function) => {
    this.listeners.add(listener);
    let isSubscribed = true;
    return () => {
      if (!isSubscribed) {
        this.listeners.delete(listener);
      }
    };
  };

  public add = (key: string, type: PatternType, params: {}) => {
    const patternKey = sanitizeKey(key);
    const props = params;
    const id = `${this.idPrefix}-${type}__${patternKey}`;
    const pattern = { key, id, props, type };
    this.patterns.set(patternKey, pattern);
    this.dispatch();
    return patternKey;
  };

  public get = (key: string) => {
    const patternKey = sanitizeKey(key);
    const pattern = this.patterns.get(patternKey);
    return pattern ? `url(#${pattern.id})`: undefined;
  };

  public has = (key: string) => {
    return this.patterns.has(sanitizeKey(key));
  };

  public remove = (key: string) => {
    const patternKey = sanitizeKey(key);
    if (this.patterns.has(patternKey)) {
      this.patterns.delete(patternKey);
      this.dispatch();
    }
  }

  public getPatterns = () => {
    const patterns: { [key:string]: SvgPatternData } = {};
    for (let [key, pattern] of this.patterns.entries()) {
      patterns[key] = pattern;
    }
    return patterns;
  };
}

import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import styled from 'styled-components';
import JSON5 from 'json5';
import rehype from 'rehype-dom';

import 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/svg';
import 'brace/theme/eclipse';

import SvgPatternPreview from './SvgPatternPreview';

const EXAMPLE_KEYS = [
  'linear',
  'radial',
  'angular',
  'image',
  'custom',
];
const EXAMPLE_TYPE = EXAMPLE_KEYS[Math.floor(Math.random() * EXAMPLE_KEYS.length)];
const EXAMPLE_LABELS = {
  linear: 'Linear Gradient',
  radial: 'Radial Gradient',
  angular: 'Angular Gradient',
  image: 'Background Image',
  custom: 'Custom',
};
const EXAMPLE_OPTIONS = {
  linear: {
    from: '#009999',
    to: '#cc3366',
    angle: 90,
  },
  radial: {
    r: 0.71,
    stops: [
      // center
      { offset: 0, color: '#330000' },
      { offset: 0.23, color: '#110000' },
      // ring
      { offset: 0.24, color: '#cc6600' },
      { offset: 0.27, color: '#993300' },
      { offset: 0.34, color: '#660000' },
      //
      { offset: 0.35, color: '#cc6600' },
      { offset: 0.40, color: '#993300' },
      { offset: 0.47, color: '#660000' },
      //
      { offset: 0.48, color: '#cc6600' },
      { offset: 0.55, color: '#993300' },
      { offset: 0.64, color: '#660000' },
      //
      { offset: 0.65, color: '#cc6600' },
      { offset: 0.74, color: '#993300' },
      { offset: 0.84, color: '#660000' },
      //
      { offset: 0.85, color: '#cc6600' },
      { offset: 0.91, color: '#993300' },
      { offset: 1, color: '#660000' },
    ],
  },
  angular: {
    slices: 200,
    stops: ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ff0000'],
  },
  image: {
    src: 'https://via.placeholder.com/150',
  },
  custom: `<g transform="translate(0.5, 0.5) scale(1.42) rotate(-45) translate(-0.5, -0.5)">
  <g>
    <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0, 0" to="0, -1" dur="5s" repeatCount="indefinite" />
    <rect fill="#FD5068" x="0" y="0" width="1" height="1" />
    <rect fill="#FC9B27" x="0" y="0.167" width="1" height="1" />
    <rect fill="#FFDE4B" x="0" y="0.333" width="1" height="1" />
    <rect fill="#3CCE9E" x="0" y="0.5" width="1" height="1" />
    <rect fill="#429AEA" x="0" y="0.666" width="1" height="1" />
    <rect fill="#7366D3" x="0" y="0.833" width="1" height="1" />
    <rect fill="#FD5068" x="0" y="1" width="1" height="1" />
    <rect fill="#FC9B27" x="0" y="1.167" width="1" height="1" />
    <rect fill="#FFDE4B" x="0" y="1.333" width="1" height="1" />
    <rect fill="#3CCE9E" x="0" y="1.5" width="1" height="1" />
    <rect fill="#429AEA" x="0" y="1.666" width="1" height="1" />
    <rect fill="#7366D3" x="0" y="1.833" width="1" height="1" />
  </g>
</g>
`,
};

function unwrapSvgElement() {
  function findSvgElement(node) {
    if (node.type === 'element' && node.tagName === 'svg') {
      return node;
    }
    return node.children && node.children.find(childNode => findSvgElement(childNode));
  }

  function findSvgRoot(node) {
    const svgElement = node && findSvgElement(node);
    return !svgElement ? node : {
      type: 'root',
      children: svgElement.children,
    };
  }

  return node => findSvgRoot(node);
}

function evaluateWithId(id) {
  // Janky security...hopefully nobody wants to self-XSS
  const globals = {
    window: {},
    document: {},
    globalThis: {},
    console: {},
    alert: () => undefined,
    fetch: () => undefined,
    XMLHttpRequest: undefined,
  };
  const globalKeys = Object.keys(globals);
  const globalValues = globalKeys.map(key => globals[key]);
  function processExpression(expression) {
    if (!expression.trim()) {
      return undefined;
    }
    try {
      // eslint-disable-next-line no-new-func
      const expressionFn = new Function(['id', ...globalKeys], `return (${expression});`);
      const result = expressionFn(id, ...globalValues);
      return result.toString();
    } catch (e) {
      console.error('failed to evaluate expression:', expression);
      console.error(e);
      return expression;
    }
  }

  function processValue(value, key) {
    const [, expression] = value.match(/^\{(.*)\}$/) || [value, undefined];
    return expression == null ? value : processExpression(expression);
  }

  function processNode(srcNode) {
    if (!srcNode) {
      return srcNode;
    }
    const node = { ...srcNode };
    if (node.children) {
      node.children = srcNode.children.map(childNode => processNode(childNode));
    }
    if (node.properties) {
      node.properties = {};
      Object.entries(srcNode.properties).forEach(([key, value]) => {
        node.properties[key] = processValue(value, key);
      });
    }
    if (node.type === 'text') {
      node.value = processValue(node.value);
    }
    return node;
  }

  return node => processNode(node);
}

const createSvgGroup = (value, id) => {
  window.lastValue = value;
  let processedValue;
  try {
    processedValue = rehype()
      .use(unwrapSvgElement)
      .use(evaluateWithId, id)
      .processSync(`<svg>${value}</svg>`)
      .toString();
  } catch (e) {
    processedValue = value;
  }
  return (
    <g dangerouslySetInnerHTML={{ __html: processedValue }} />
  );
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TYPE': {
      const type = action.payload;
      const exampleOptions = EXAMPLE_OPTIONS[type];
      const options = typeof exampleOptions === 'string'
        ? { children: id => createSvgGroup(exampleOptions, id), }
        : exampleOptions;
      const optionsValue = typeof exampleOptions === 'string'
        ? exampleOptions
        : JSON5.stringify(exampleOptions, null, 2) + '\n';
      return { ...state, type, options, optionsValue };
      }

    case 'SET_OPTIONS_VALUE': {
      const optionsValue = action.payload;
      try {
        const options = state.type === 'custom'
          ? { children: id => createSvgGroup(optionsValue, id) }
          : JSON5.parse(optionsValue);
        return { ...state, options, optionsValue };
      } catch (e) {
        return { ...state, optionsValue };
      }
    }

    default:
      return state;
  }
}

const DemoPatternEditor = ({
  className,
  onSetPatternId,
  patternKey = 'demo',
  registerSvgPattern,
}) => {
  const [{
    type,
    optionsValue,
    options,
  }, dispatch] = useReducer(reducer, {
    type: EXAMPLE_TYPE,
    options: typeof EXAMPLE_OPTIONS[EXAMPLE_TYPE] === 'string'
      ? { children: id => createSvgGroup(EXAMPLE_OPTIONS[EXAMPLE_TYPE], id), }
      : EXAMPLE_OPTIONS[EXAMPLE_TYPE],
    optionsValue: typeof EXAMPLE_OPTIONS[EXAMPLE_TYPE] === 'string'
      ? EXAMPLE_OPTIONS[EXAMPLE_TYPE]
      : JSON5.stringify(EXAMPLE_OPTIONS[EXAMPLE_TYPE], null, 2) + '\n',
  })
  const [fill, setFill] = useState('');

  const codeSample = useMemo(() => {
    const typeString = JSON5.stringify(type);
    let optionsString;
    if (type === 'custom') {
      optionsString = `{
  children: id => (
    <g>
${optionsValue.split('\n').map(line => `      ${line}`).join('\n')}
    </g>
  )
}`;
    } else {
      try {
        optionsString = JSON5.stringify(options, null, 2);
      } catch (e) {
        optionsString = '';
      }
    }

    return `// Example Usage
import { createManagedSvgPatternLibrary } from 'react-svg-patterns';

const {
  ManagedSvgPatternLibrary,
  registerSvgPattern,
} = createManagedSvgPatternLibrary();

// Register pattern
const yourPatternId = registerSvgPattern('yourPatternKey', ${typeString}, ${optionsString});

// Use pattern as a fill in a component
const YourSvgComponent = (...props) => (
  <svg fill={yourPatternId} {...props}>
    {/* shapes, etc. */}
  </svg>
);

// Render ManagedSvgPatternLibrary component in your app
const YourApp = () => (
  <>
    <div>
      <YourSvgComponent />
    </div>
    <ManagedSvgPatternLibrary />
  </>
);
`;
  }, [type, options, optionsValue])

  const handleTypeChange = useCallback((e, value = e.currentTarget.value) => {
    dispatch({ type: 'SET_TYPE', payload: value });
  }, []);

  const handleOptionsEditorChange = useCallback((value) => {
    dispatch({ type: 'SET_OPTIONS_VALUE', payload: value });
  }, []);

  useEffect(() => {
    const patternId = registerSvgPattern(patternKey, type, options);
    setFill(patternId);
    if (onSetPatternId) {
      onSetPatternId(patternId);
    }
  }, [onSetPatternId, patternKey, registerSvgPattern, type, options]);

  const aceTheme = 'eclipse';
  const aceEditorProps = useMemo(() => ({
    $blockScrolling: true,
  }), []);
  const aceOptions = useMemo(() => ({
    showLineNumbers: false,
    tabSize: 2,
    showPrintMargin: false,
    useSoftTabs: true,
    useWorker: false,
  }), []);

  return (
    <div className={className}>
      <div className="typeSelect">
        <label>Type</label>
        <select onChange={handleTypeChange} value={type}>
          {EXAMPLE_KEYS.map(key => (
            <option key={key} value={key}>{EXAMPLE_LABELS[key] || key}</option>
          ))}
        </select>
      </div>
      <div className="optionsEditor">
        <AceEditor
          editorProps={aceEditorProps}
          height="100%"
          mode={type === 'custom' ? 'svg' : 'javascript'}
          name="patternOptions"
          onChange={handleOptionsEditorChange}
          setOptions={aceOptions}
          theme={aceTheme}
          value={optionsValue}
          width="100%"
        />
      </div>
      <div className="patternPreview">
        <SvgPatternPreview fill={fill} preserveAspectRatio="none" />
      </div>
      <div className="codeSample">
        <AceEditor
          editorProps={aceEditorProps}
          mode="javascript"
          name="sampleCode"
          height="100%"
          readOnly
          setOptions={aceOptions}
          theme={aceTheme}
          value={codeSample}
          width="100%"
        />
      </div>
    </div>
  );
};

export default styled(DemoPatternEditor)`
  display: grid;
  grid-template-rows: min-content 0.5fr 0.5fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1px;
  background-color: #9f9f9f;
  border-top: 1px solid #9f9f9f;
  border-bottom: 1px solid #9f9f9f;

  .typeSelect {
    display: flex;
    position: relative;
    grid-row: 1 / 2;
    grid-column: 1 / 2;

    > label {
      padding: 10px 20px;
      color: #9f9f9f;
      background-color: #e8e8e8;
      border-right: 1px solid #9f9f9f;
    }

    > select {
      appearance: none;
      display: block;
      width: 100%;
      height: 100%;
      padding: 10px 20px;
      box-sizing: border-box;
      outline: 0;
      border: 0;
      border-radius: 0;
      background-color: #fff;
      color: inherit;
      font: inherit;
      cursor: pointer;

      &:focus {
        background-color: #e8f2fd;
      }
    }

    &::after {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      padding: 10px;
      pointer-events: none;
      color: #9f9f9f;
      content: '▾';
    }
  }

  .optionsEditor {
    grid-row: 2 / -2;
    grid-column: 1 / 2;
    height: 100%;
  }

  .patternPreview {
    grid-row: 1 / -2;
    grid-column: 2 / 3;
    background-color: #fff;

    > svg {
      display: block;
      width: 100%;
      min-height: 100%;
    }
  }

  .codeSample {
    grid-row: -2 / -1;
    grid-column: 1 / -1;
  }
`;

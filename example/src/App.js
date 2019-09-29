import React, {
  useCallback,
  useState,
} from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import {
  VERSION,
  createManagedSvgPatternLibrary,
} from 'react-svg-patterns';

import DemoPatternEditor from './DemoPatternEditor';
import GithubCorner from './GithubCorner';

const GlobalStyle = createGlobalStyle`
  ${reset}

  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: sans-serif;
    color: #000;
    background-color: #fff;
  }

  a {
    color: #36f;

    &:hover {
      color: #69f;
    }

    &:active {
      color: #69f;
    }
  }
`;

const {
  ManagedSvgPatternLibrary,
  registerSvgPattern,
} = createManagedSvgPatternLibrary();

const App = ({ className }) => {
  const [fill, setFill] = useState();
  const handleSetPatternId = useCallback((patternId) => {
    setFill(patternId);
  }, []);

  return (
    <>
      <GlobalStyle />
      <div className={className}>
        <main>
          <header>
            <h1>React SVG Pattern Manager</h1>
            <p>Create, manage, and use SVG patterns in your React components!</p>
          </header>
          <DemoPatternEditor
            onSetPatternId={handleSetPatternId}
            patternKey="demo"
            registerSvgPattern={registerSvgPattern}
          />
          <footer>
            <p>
              <code>
                <a href="https://www.npmjs.com/package/react-svg-patterns" target="_blank">react-svg-patterns</a>
                {`@${VERSION}`}
              </code>
            </p>
            <p>© 2019 <a href="https://mcknig.ht" target="_blank">Keith McKnight</a></p>
          </footer>
        </main>
        <aside>
          <a href="https://github.com/kmck/react-svg-patterns" target="_blank">
            <GithubCorner backgroundFill={fill} />
          </a>
        </aside>
      </div>
      <ManagedSvgPatternLibrary idPrefix="libraryDemo" />
    </>
  );
};

export default styled(App)`
  main {
    display: grid;
    grid-template-rows: min-content auto min-content;
    width: 100vw;
    min-height: 100vh;
  }

  header {
    padding: 20px 80px 20px 34px;
    min-height: 100px;
    box-sizing: border-box;
  }

  h1 {
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 10px;
  }

  code {
    font-family: monospace;
  }

  aside {
    position: fixed;
    top: 0;
    right: 0;

    a,
    svg {
      display: block;
    }
  }

  footer {
    padding: 20px 34px;
    font-size: 0.8rem;
    text-align: center;
    box-sizing: border-box;
  }

  p:not(:last-child) {
    margin-bottom: 10px;
  }
`;
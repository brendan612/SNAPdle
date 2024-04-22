import React, { Suspense } from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
`;

export const App = () => {
  return (
    <div>
      <h1>Example app</h1>
      <GlobalStyle />
    </div>
  );
};

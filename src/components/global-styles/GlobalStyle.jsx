import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
  }
  
.ant-select-arrow {
    width: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

  body {
    height: 100%;
    #root {
      height: 100%;
    }
  }
`;

export default GlobalStyle;
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

  body {
    height: 100%;
    #root {
      height: 100%;
    }
    .grecaptcha-badge {
      display : none;
    }
  }
`;

export default GlobalStyle;
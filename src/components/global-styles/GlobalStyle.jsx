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

  ::-webkit-scrollbar {
    width: .5rem;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
    border-radius: 10rem;
  }
   
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 10rem;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
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
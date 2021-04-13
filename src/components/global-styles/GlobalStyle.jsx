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

  .ant-select { 
    width: 28rem;
    border: .05rem solid gainsboro;
    border-radius: 1rem;
    display: flex;
    flex-direction: row;
    height: 3.5rem;
    .ant-select-selector {
        width: 90%;
        .ant-select-selection-search {
            position: relative;
            .ant-select-selection-search-input {
                width: 24rem;
                height: 2.5rem;
                outline: none;
                border: none;
                position: absolute;
                top: .5rem;
                left: .5rem;
            }
    }
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
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    //text-decoration: none;
    outline : none;
    background-color: #000000;
    font-family: 'Noto Sans KR', sans-serif;
  }

  body {
    overflow: hidden;
  }

  html {
    font-size: 20px;
    color: #ffffff;
  }
`;

export default GlobalStyle;

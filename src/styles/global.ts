import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body{
    background: #FFF;
    color: #073b4c;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, select{
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, strong{
    font-weight: 500;
  }

  button{
    cursor: pointer;
  }

  @media screen and (min-width: 768px){
    body{
      font-size: 24px;
    }
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;

  overflow: hidden;
`;

export const Header = styled.header`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  strong {
    font-weight: 700;
  }

  div {
    line-height: 1.4em;

    &:first-child {
      font-size: 1.1em;
      strong {
        color: #ef476f;
      }
    }

    &:last-child {
      font-size: 0.9em;
      text-align: right;
    }
  }

  @media screen and (min-width: 768px) {
    div {
      display: flex;

      strong {
        margin-right: 8px;
      }

      &:last-child {
        font-size: 0.6em;

        strong {
          &::after {
            content: ':';
          }
        }
      }
    }
  }
`;

export const Main = styled.main`
  > div {
    min-height: 70vh;
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 768px) {
    > div {
      min-height: 80vh;
    }
  }
`;

export const Section = styled.section`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  &:first-child {
    position: relative;

    &:before{
      content: '';
      position: absolute;
      top: -30vh;
      left: -30px;
      width: calc(100% + 60px);
      height: 80vh;
      background: url('/logo.svg') 35vw center / 100% 100% no-repeat;
      z-index: -1;
      opacity: 0.08;

      @media screen and (min-width: 1200px) {
        display: none;
      }
    }

    h1 {
      font-size: 2.4em;
      line-height: 1.1em;
      display: flex;
      flex-direction: column;
      justify-content: center;

      margin-bottom: 24px;

      strong {
        font-weight: 700;
        font-size: 1.2em;
        color: #2a9d8f;
      }

      span {
        display: inline-block;
      }
    }

    label {
      display: inline-flex;
      align-items: center;
      font-size: 1em;
      position: relative;

      &:hover {
        &::after {
          border-bottom-color: #ef476f;
        }
      }

      svg {
        margin-right: 8px;
        color: #ef476f;
      }

      &::after {
        content: '';
        display: block;
        border-bottom: dotted 2px;
        position: absolute;
        top: 100%;
        width: 100%;
        transition: border-color 0.2s;
      }

      select {
        appearance: none;
        background: none;

        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: 0;
        padding: 16px;
        cursor: pointer;
      }

      span {
        position: relative;
        z-index: 1;
        background: #fff;
        pointer-events: none;
        display: inline-flex;
        align-items: center;
      }
    }
  }

  &:last-child {
    img {
      width: 100%;
      height: auto;
    }
    span {
      font-size: 0.5em;
      align-self: flex-end;
      opacity: 0.5;
      a {
        color: inherit;
        font-weight: 700;
        text-decoration: none;
      }
    }

    @media screen and (max-width: 1199px) {
      display: none;
    }
  }
`;

export const List = styled.ul`
  margin-top: 16px;
  list-style: none;
  display: block;

  li {
    margin-bottom: 8px;

    a{
      color: inherit;
      text-decoration: none;

      &::before {
        content: '• ';
        color: #ef476f;
      }
      strong {
        font-weight: 700;
        margin-right: 8px;
        transition: color .2s;
      }

      &:hover{
        strong{
          color: #2a9d8f;
        }
      }
    }
    
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, auto);
    display: grid;
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(3, auto);
  }
`;

export const Footer = styled.footer`
  margin-top: 32px;
  padding-top: 32px;
  border-top: solid 1px #e6e6e6;
  font-size: 0.8em;

  a {
    color: inherit;
    text-decoration: none;
    display: inline-flex;
    align-items: center;

    svg{
      margin-right: 8px;
    }

    strong{
      font-weight: 700;
    }

    &:hover{
      text-decoration: underline;
    }
  }

  > div + div{
    margin-top: 16px;
  }

  @media screen and (min-width: 768px) {
    margin: 80px 0;
    font-size: 0.6em;

    display: flex;

    > div{
      flex: 1;
      
      &:first-child{
        padding-right: 16px;
      }

      &:not(:first-child){
        flex: 0.8;
        text-align: right;
      }
    }
  }
`;

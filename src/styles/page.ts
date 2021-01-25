import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.header`
  margin-bottom: 16px;
  display: flex;
  align-items: center;

  strong {
    font-weight: 700;
    margin-right: 8px;
  }
`;

export const Main = styled.main`
  > div {
    min-height: 70vh;
    display: flex;
    align-items: center;

    section {
      flex: 1;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      &:first-child {
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
          cursor: pointer;

          svg {
            margin-right: 8px;
          }

          &::after {
            content: '';
            display: block;
            border-bottom: dotted 2px;
            position: absolute;
            top: 100%;
            width: 100%;
          }

          select {
            appearance: none;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border: 0;
            padding: 16px;
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
    }
  }

  @media screen and (min-width: 768px) {
    > div {
      min-height: 80vh;
    }
  }
`;

export const List = styled.ul`
  margin-top: 16px;
  list-style: none;
  display: block;

  li {
    margin-bottom: 8px;
    strong {
      font-weight: 700;
      margin-right: 8px;
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
  font-size: 0.6em;

  a {
    color: inherit;
    font-weight: 700;
    text-decoration: none;
  }

  @media screen and (min-width: 768px) {
    margin-top: 80px;
  }
`;

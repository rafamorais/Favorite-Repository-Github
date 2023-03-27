import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  margin: 80px auto;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 150px;
    border-radius: 20%;
    margin: 20px 0px;
  }

  h1 {
    font-size: 30px;
    color: #0d2336;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #000;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
  }
`;

export const Loading = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background-color: transparent;
`;

export const IssuesList = styled.ul`
  margin-top: 30px;
  padding: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;

    & + li {
      border-top: 1px solid #0d2636;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }

    div {
      flex: 1;
      margin-left: 12px;

      strong {
        font-size: 15px;

        a {
          text-decoration: none;
          color: #222;
          transform: 0.3s;

          &:hover {
            color: #0071db;
          }
        }

        span {
          background-color: #222;
          color: #fff;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          padding: 3px 7px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 10px;
        font-size: 12px;
        color: black;
      }
    }
  }
`;

export const PageActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    outline: 0;
    border: 0;
    color: #fff;
    background-color: #222;
    padding: 5px 10px;
    border-radius: 4px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

interface FilterListDTO {
  active: number;
}
export const FilterList = styled.div<FilterListDTO>`
  margin: 15px 0;
  button {
    outline: 0;
    border: 0;
    padding: 8px;
    border-radius: 4px;
    margin: 0 3px;

    &:nth-child(
        ${(props) => {
            return props.active + 1;
          }}
      ) {
      background-color: #0071db;
      color: #fff;
    }
  }
`;

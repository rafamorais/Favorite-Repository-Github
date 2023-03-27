import styled, { css, keyframes } from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0, 0, 20px rgba(0, 0, 0, 0.2);
  margin: 80px auto;
  padding: 30px;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

interface Test {
  error: boolean;
}

export const Form = styled.form<Test>`
  margin-top: 30px;
  display: flex;

  input {
    flex: 1;
    border: 1px solid
      ${(props) => {
        return props.error ? "#FF0000" : "#ddd";
      }};
    border-radius: 4px;
    font-size: 17px;
  }
`;

interface ButttonPropsDTO {
  loading: number;
  color: string;
}

const animate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }
`;
export const SubmitButton = styled.button.attrs(
  ({ loading }: ButttonPropsDTO) => ({
    type: "submit",
    disabled: loading,
  })
)`
  background-color: ${(props) => {
    return props.color ? props.color : "#0d2636";
  }};
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${animate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 20px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & + li {
      border-top: 1px solid #0d2636;
    }

    a {
      color: #0d2636;
      text-decoration: none;
    }
  }
`;
export const DeleteButton = styled.button.attrs({
  type: "button",
})`
  background-color: transparent;
  color: #0d2636;
  border: none;
  padding: 8px 7px;
  outline: 0;
  border-radius: 4px;
`;

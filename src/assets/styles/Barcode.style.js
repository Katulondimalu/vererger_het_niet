import styled from 'styled-components';

export const ScannerBox = styled.div`
  position: 'relative';
  margin-left: 16px;
  margin-right: 16px;
  display: 'flex';
  padding: 4px;
  /* min-height: min(300px, 60vh);
  max-height: 60vh; */
`;

export const BarcodeSubtext = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  text-align: center;
  color: var(--button-color);
  font-weight: bold;
`;

export const InputField = styled.div`
  margin: 13px 0;
  display: flex;
  justify-content: space-evenly;
`;

export const InputBox = styled.div`
  input {
    width: 100%;
    border: 0;
    outline: 0;
    border-bottom: 1px solid var(--button-color);
    font-size: 1rem;
    padding: 7px 0;
    transition: border-color 0.2s;

    &:placeholder-shown ~ .form__label {
      font-size: 1.3rem;
      cursor: text;
      top: 20px;
    }
  }
`;

export const ButtonBox = styled.div`
margin-top: '8rem';
  span {
    background-color: #fff;
    border: 1px solid #d5d9d9;
    border-radius: 8px;
    box-shadow: rgba(213, 217, 217, 0.5) 0 2px 5px 0;
    box-sizing: border-box;
    color: #0f1111;
    cursor: pointer;
    display: inline-block;
    font-size: 13px;
    line-height: 29px;
    padding: 0 6px 0 6px;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    min-width: 70px;
    max-width: fit-content;
    margin-top: 5px;
    :hover {
      border: 1px solid var(--button-color);
    }
  }
`;

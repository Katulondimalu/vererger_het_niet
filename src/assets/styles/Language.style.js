import styled from 'styled-components';

export const LanguageButton = styled.button`
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  /* aspect-ratio: 2/3; */
  padding: 0;
  padding-top: calc(2 / 3 * 100%);
  &.selected {
    box-shadow: inset black 0px 0px 0px 5px, inset white 0px 0px 0px 10px;
  }
`;

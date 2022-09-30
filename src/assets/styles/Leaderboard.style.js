import styled from 'styled-components';

export const LeaderBoardText = styled.h2`
  text-align: center;
  color: var(--button-color);
`;

export const LeaderBoardHeadingText = styled.h2`
  text-align: center;
  color: #8c8c8b;
`;

export const LeaderBoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 16px;
`;

export const LeaderBoardTable = styled.table`
  position: relative;
  padding: 20px;
  //min-height: calc(100vh - 350px);
  height: 350px;
  max-height: 350px;
  border: 1px solid var(--button-color);
  border-radius: 15px;
  overflow: hidden;
`;

export const LeaderBoardHeader = styled.thead`
  tr {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--button-color);
    th {
      text-align: center;
      &:nth-child(1) {
        width: 20%;
      }
      &:nth-child(2) {
        width: auto;
      }
      &:nth-child(3) {
        width: 20%;
      }
    }
    margin-right: 20px;
  }
`;

export const LeaderBoardBody = styled.tbody`
  tr {
    display: flex;
    justify-content: space-between;
    td {
      overflow-y: scroll;
      text-align: center;
      &:nth-child(1) {
        width: 20%;
      }
      &:nth-child(2) {
        width: 20%;
      }
      &:nth-child(3) {
        width: 20%;
      }
    }
    margin-right: 20px;
  }

  //overflow-y: auto;
`;

export const ArrowUpIcon = styled.div`
  position: absolute;
  width: auto;
  height: auto;
  top: 25px;
  right: 6px;
  cursor: pointer;
`;
export const ArrowDownIcon = styled.div`
  position: absolute;
  width: auto;
  height: auto;
  bottom: -6px;
  right: 6px;
  cursor: pointer;
`;

export const NoRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 15px;
  padding: 20px;
  border: 1px solid var(--button-color);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  color: #8c8c8b;
`;

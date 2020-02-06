import styled from "styled-components";

export const Explorer = styled.div`
  background: #eeeeee;
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
`;

export const ExplorerItem = styled.div`
  border-bottom: 1px solid black;
  display: grid;
  grid-template-columns: 50% 30% 20%;
  margin: 2px 0px;
  span{
      border-right: ipx solid grey;
  }
`;

export const Route = styled.div`
  font-family: "Raleway", sans-serif;
  font-weight: bold;
  font-size: 24px;
  border-bottom: 2px solid black;
  margin: 3px 0px;
  span {
    cursor: pointer;
  }
`;

import styled from "styled-components";

export const ManagementContainer = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  margin-top: 15px;
`;
export const Li = styled.li`
  list-style: none;
  padding: 8px;
  cursor: pointer;
  font-size: 1.3em;
`;

export const Header = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ButtonAdd = styled.div`
  padding: 5px;
  border-radius: 8px;
  background: white;
  border: grey solid 1px;
  font-size: 1em;
  width: 70px;
  text-align: center;
  cursor: pointer;
`;
export const Pag = styled.span`
  grid-column: 1 / span 2;
  text-align: center;
`;
export const TableContent = styled.div`
  border: solid black 1px;
  height: 400px;
  width: 80%;
  overflow-y: scroll;
`;
export const TableHead = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 8px;
  border-bottom: 1px solid black;
`;
export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  justify-content: center;
  align-items: center;
  text-align: center;
`;

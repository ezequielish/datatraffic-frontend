import styled from "styled-components";

export const SummaryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
`;
export const SummaryActions = styled.div`
  width: 50%;
  border: solid 1px grey;
  height: 400px;
  background: white;
`;
export const HeadActions = styled.p`
  display: flex;
  justify-content: space-around;
  border-bottom: solid 1px grey;
  padding: 5px;
`;
export const LiSummary = styled.li`
  display: grid;
  grid-template-columns: 50% 50%;
  text-align: center;
  padding: 8px;
`;

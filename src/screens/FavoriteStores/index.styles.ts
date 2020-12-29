import styled from 'styled-components/native';

export const LocationInfoContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding: 20px 16px 16px 16px;
`;

export const NoStoresContainer = styled.View`
  height: 75%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const LocationTitle = styled.Text`
  font-size: 10px;
  font-weight: bold;
  margin-left: 10px;
`;

export const LocationAddress = styled.Text`
  font-size: 10px;
  max-width: 60%;
`;

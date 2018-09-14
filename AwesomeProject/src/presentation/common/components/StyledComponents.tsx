import styled from "styled-components";

export const primaryColor = "royalblue";

export const StyledWrapper = (styled as any).View`
    margin: 10px 10px;
  `;

export const StyledView = (styled as any).View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;



export const StyledText = (styled as any).Text`
  color: ${primaryColor};
`;



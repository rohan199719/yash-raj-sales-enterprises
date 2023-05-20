import styled from "styled-components";
import { TouchableOpacity, Text, View } from "react-native";

export const SubmitButton = styled(TouchableOpacity)`
  width: 80%;
  height: 44px;
  border-radius: 4px;
  background-color: #689f38;
  justify-content: center;
  align-items: center;
`;
export const SubmitButtonText = styled(Text)`
  color: #fff;
  font-weight: normal;
  font-size: 18px;
  font-family: sans-serif-medium;
`;

export const LogoutButtonContainer = styled(View)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  padding-bottom:80px;
  //background-color:red;
`;

import styled from "styled-components";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";

export const LoginScreenContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
const BgImage = require("../../../../assets/appAccountBg.png");
export const BackgroundImage = styled(ImageBackground).attrs({
  source: BgImage,
})`
  flex: 1;
`;
export const BackgroundScreenOpacityLayer = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.tertiary};
  opacity: 0.9;
`;
export const LogoContainer = styled(View)`
  height: 300px;
  margin-top: 64px;
  align-items: center;
  justify-content: center;
`;

const logo = require("../../../../assets/yash_raj_sales_app_logo.png");
export const Logo = styled(Image).attrs({
  source: logo,
})`
  width: 80%;
  height: 80%;
  resize-mode: contain;
`;
export const LoginFormContainer = styled(View)`
  height: 200px;
  justify-content: space-between;
  align-items: center;
`;
export const UserInputContainer = styled(View)`
  flex: 3.5;
  width: 80%;
  justify-content: flex-start;
  align-items: center;
`;
export const EmailInput = styled(TextInput)`
  height: 32%;
  width: 100%;
  border-radius: 4px;
  margin-start: 8px;
  margin-end: 8px;
  margin-bottom: 8px;
  padding: 8px;
  color: #757575;
  font-weight: normal;
  font-size: 18px;
  font-family: sans-serif-medium;
  background-color: #dcedc8;
  border-bottom-width: 2px;
  border-bottom-color: #689f38;
`;
export const PasswordInput = styled(TextInput)`
  height: 32%;
  width: 100%;
  border-radius: 4px;
  margin-start: 8px;
  margin-end: 8px;
  margin-bottom: 8px;
  padding: 8px;
  color: #757575;
  font-weight: normal;
  font-size: 18px;
  font-family: sans-serif-medium;
  background-color: #dcedc8;
  border-bottom-width: 2px;
  border-bottom-color: #689f38;
`;
export const SubmitButtonContainer = styled(View)`
  flex: 1;
  width: 80%;
  justify-content: flex-end;
  align-items: center;
`;
export const SubmitButton = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
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

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

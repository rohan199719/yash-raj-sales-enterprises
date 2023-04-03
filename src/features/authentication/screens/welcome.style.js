import styled from "styled-components";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";

import { SvgXml } from "react-native-svg";
import svgImage from "../../../../assets/image";

export const ScreenContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  background-color: #ffffff;
`;
const BgImage = require("../../../../assets/appAccountBg.png");
export const BackgroundImage = styled(ImageBackground).attrs({
  source: BgImage,
})`
  flex: 1;
`;
export const BackgroundScreenOpacityLayer = styled(View)`
  flex: 1;
  background-color: #ffffff;
  opacity: 0.9;
`;
export const LogoContainer = styled(View).attrs({})`
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
export const ButtonContainer = styled(View)`
  height: 25%;
  justify-content: flex-start;
  align-items: center;
`;
export const Button = styled(TouchableOpacity)`
  height: 25%;
  width: 80%;
  margin-bottom: 32px;
  border-radius: 4px;
  background-color: #689f38;
  justify-content: center;
  align-items: center;
`;
export const ButtonText = styled(Text)`
  color: #fff;
  font-weight: normal;
  font-size: 18px;
  font-family: sans-serif-medium;
`;

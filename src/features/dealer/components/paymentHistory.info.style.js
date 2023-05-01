import styled from "styled-components";
import { Card } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";

export const MainContainer = styled(View)`
  height: 64px;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  border-radius: 4px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.ui.primary};
  flex: 1;
  flex-direction: row;
`;
export const BottomContainer = styled(View)`
  flex: 1;
  padding-horizontal: 4px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TimeSection = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const PaymentDetailSection = styled(View)`
  padding-top: 2px;
  flex: 3;
  margin-left: 8px;
  justify-content: space-between;
`;

export const TopView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
  margin-right:6px;
`;
export const MiddleView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;
export const BottomView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-right: 20px;
`;

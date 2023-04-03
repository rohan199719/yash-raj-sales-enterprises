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

export const DealerCard = styled(Card)`
  flex-direction: row;
  height: 128px;
  background-color: ${(props) => props.theme.colors.ui.primary};
`;
export const MainContainer = styled(View)`
  height: 150px;
  margin: 8px;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  border-radius: 4px;
  border-width: 0.5px;
  border-color: ${(props) => props.theme.colors.ui.primary};
`;

export const TopConatiner = styled(View)`
  flex: 4;
  flex-direction: row;
  justify-content: flex-start;
`;
export const BottomContainer = styled(View)`
  flex: 1;
  padding-horizontal: 4px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DealeCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const Address = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;
export const ProfileSection = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

export const SectionEnd = styled(View)`
  padding-top: 8px;
  flex: 3;
  margin-left: 8px;
  justify-content: flex-start;
`;

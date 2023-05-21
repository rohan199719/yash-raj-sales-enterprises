import styled from "styled-components/native";
import { FlatList, View, Text, TouchableOpacity } from "react-native";

export const DealerList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
export const MainView = styled(View)`
  flex: 1;
`;
export const TitleView = styled(View)`
  height: 40px;
  justify-content: center;
  align-items: flex-start;
  background-color: ${(props) => props.theme.colors.ui.primary};
  padding-horizontal: 8px;
`;
export const TopView = styled(View)`
  height: 150px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${(props) => props.theme.colors.ui.tertiary};
`;

export const DetailsView = styled(View)`
  flex: 1;
  height: 100%;
  padding-top: 4px;
  margin-left: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.ui.tertiary};
`;
export const BottomContainer = styled(View)`
  flex: 1;
  padding-horizontal: 4px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Address = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;
export const ProfileSection = styled(View)`
  align-items: center;
  justify-content: flex-start;
`;

export const SectionEnd = styled(View)`
  padding-top: 8px;
  flex: 3;
  margin-left: 8px;
  justify-content: flex-start;
`;

export const BottomView = styled(View)`
  flex-direction: row;
  margin-right: 20px;
`;
export const MiddleView = styled(View)`
  height: 128px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${(props) => props.theme.colors.ui.tertiary};
`;
export const Divider = styled(View)`
  height: 16px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.ui.quaternary};
`;

export const DividertertiarySmall = styled(View)`
  height: 8px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.ui.quaternary};
`;
export const CustomTabView = styled(View)`
  height: 40px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.ui.tertiary};
`;
export const AddPaymentButton = styled(TouchableOpacity)`
height:80px;
width:80px;
margin-horizontal:8px;
  justify-content: center;
  align-items: center;
  border-radius:40px
  background-color:${(props) => props.theme.colors.ui.primary};
  border-width:4px;
  border-color:#388E3C;
  elevation:8
`;
export const AddOrderButton = styled(TouchableOpacity)`
height:80px;
width:80px;
margin-horizontal:8px;
  justify-content: center;
  align-items: center;
  border-radius:40px
  background-color:${(props) => props.theme.colors.ui.primary};
  border-width:4px;
  border-color:#388E3C;
  elevation:8
`;
export const ExportDealerHistoryButton = styled(TouchableOpacity)`
height:80px;
width:80px;
margin-horizontal:8px;
  justify-content: center;
  align-items: center;
  border-radius:40px
  background-color:${(props) => props.theme.colors.ui.primary};
  border-width:4px;
  border-color:#388E3C;
  elevation:8
`;

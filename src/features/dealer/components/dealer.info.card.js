import React from "react";
import { SvgXml } from "react-native-svg";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Spacer } from "../../global/components/spacer/spacer.component";
import { Text } from "../../global/components/typography/text.component";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import {
  DealerCard,
  DealerCardCover,
  Info,
  ProfileSection,
  SectionEnd,
  Rating,
  Icon,
  Address,
  MainContainer,
  TopConatiner,
  BottomContainer,
} from "./dealer.info.card.style";

export default function DealerInfoCard({ dealer = {} }) {
  // const {
  //   dealerId = "test123",
  //   mobleNumer = "808088021",
  //   name = "Krishna Kumar",
  //   nickname = "pintu bhaiya",
  //   buisnessName = "KISAAN PASHU AMRIT LIMITED  ENTERPRISES ",
  //   address = "Rehla,Garhwa,822102,newr pampukal datonganj",
  //   dueAmount = "5,00,0000",
  //   lastPaymentDate = "21 Oct 2022",
  //   lastFollow = "21/01/23",
  // } = dealer;
  const {
    dealerId,
    mobleNumer,
    name,
    nickname,
    buisnessName,
    address,
    dueAmount,
    lastPaymentDate,
    lastFollow,
    paymentHistory = [],
    orderHistory = [],
  } = dealer;

  return (
    <MainContainer>
      <TopConatiner>
        <ProfileSection>
          <Ionicons name="ios-person-circle" size={92} color="#689F38" />
        </ProfileSection>
        <SectionEnd>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
            }}
          >
            <Text variant="title" adjustsFontSizeToFit numberOfLines={2}>
              {buisnessName}
            </Text>
            <Text
              style={{ marginBottom: 4 }}
              variant="labelSmall"
              adjustsFontSizeToFit
              numberOfLines={2}
            >
              {address}
            </Text>
            <Text
              style={{ marginBottom: 4 }}
              variant="captionMedium"
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {name} ({nickname})
            </Text>
          </View>
        </SectionEnd>
      </TopConatiner>
      <BottomContainer>
        <Text variant="caption" adjustsFontSizeToFit numberOfLines={1}>
          Last payment:{lastPaymentDate}
        </Text>
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            paddingHorizontal: 6,
            marginEnd: 8,
            borderRadius: 24,
            backgroundColor: "white",
            borderColor: "#689F38",
            borderWidth: 1,
            opacity: 1,
          }}
        >
          <Text
            variant="error"
            color="white"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            Due: {dueAmount}
          </Text>
        </View>
      </BottomContainer>
    </MainContainer>
  );
}

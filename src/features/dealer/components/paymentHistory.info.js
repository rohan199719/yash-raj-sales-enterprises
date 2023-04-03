import React from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../../global/components/typography/text.component";
import {
  TimeSection,
  PaymentDetailSection,
  MainContainer,
  BottomContainer,
  BottomView,
  TopView,
} from "./paymentHistory.info.style";
import { ToastAndroid, Platform, AlertIOS } from "react-native";
export default function PaymentHistoryInfo({ paymentDetails = {} }) {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const {
    dealerId = "test123",
    createdDateTimestamp = "test123",
    paymentAmount = "test123",
    DueAmount = "test123",
    dealerName = "default",
    dueAmount = "test123",
    paymentDateTimestamp = "test123",
    remark = "test",
  } = paymentDetails;
  const renderTaost = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("coming soon", ToastAndroid.SHORT);
    } else {
      AlertIOS.alert("coming soon");
    }
  };

  console.log("history card page loaded");
  return (
    <MainContainer>
      <TimeSection>
        <View style={{}}>
          <Text variant="caption">
            {months[paymentDateTimestamp.toDate().getMonth()]}{" "}
            {paymentDateTimestamp.toDate().getDate().toString()}
          </Text>
        </View>
        <View style={{}}>
          <Text variant="caption">
            {/* {months[paymentDateTimestamp.toDate().getMonth()]} */}
            {paymentDateTimestamp.toDate().getFullYear()}
          </Text>
        </View>
        <View style={{}}>
          <Text variant="labelSmall">
            {days[paymentDateTimestamp.toDate().getDay()]}
          </Text>
        </View>
      </TimeSection>
      <View
        style={{ width: 2, height: "80%", backgroundColor: "#689F38" }}
      ></View>
      <PaymentDetailSection>
        <TopView>
          <View
            style={{
              width: "50%",
              justifyContent: "flex-start",
              alignItems: "center",
              // paddingHorizontal: 6,
              // marginEnd: 4,
              borderRadius: 24,
              backgroundColor: "white",
              borderColor: "#689F38",
              borderWidth: 1,
              opacity: 1,
            }}
          >
            <Text variant="title" adjustsFontSizeToFit numberOfLines={1}>
              Amount Paid : {paymentAmount}
            </Text>
          </View>

          <Text
            style={{ width: "36%" }}
            variant="error"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            Due amount : {dueAmount}
          </Text>
        </TopView>
        <BottomView>
          <TouchableOpacity onPress={renderTaost}>
            <Text variant="labelSmall">View comments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={renderTaost}
          >
            <Text variant="labelSmall">Receipt{"   "}</Text>
            <FontAwesome5 name="receipt" size={16} color="#689F38" />
          </TouchableOpacity>
        </BottomView>
      </PaymentDetailSection>
    </MainContainer>
  );
}

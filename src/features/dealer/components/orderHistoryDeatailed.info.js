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
export default function OrderHistoryDetailedInfo({ orderDetails = {} }) {
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
    netBillingAmount = "test123",
    dealerName = "default",
    orderDateTimestamp = "test123",
    orderDateTimestampString="test123",
    Notes = "test",
  } = orderDetails;
  const renderTaost = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("coming soon", ToastAndroid.SHORT);
    } else {
      AlertIOS.alert("coming soon");
    }
  };

  console.log("order history detailed card page loaded");
  return (
    <MainContainer>
      <TimeSection>
        <View style={{}}>
          <Text variant="caption">
            {months[orderDateTimestamp.toDate().getMonth()]}{" "}
            {orderDateTimestamp.toDate().getDate().toString()}
          </Text>
        </View>
        <View style={{}}>
          <Text variant="caption">
            {/* {months[orderDateTimestamp.toDate().getMonth()]} */}
            {orderDateTimestamp.toDate().getFullYear()}
          </Text>
        </View>
        <View style={{}}>
          <Text variant="labelSmall">
            {days[orderDateTimestamp.toDate().getDay()]}
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
              Billing Amount: {netBillingAmount}
            </Text>
          </View>

          {/* <Text
            style={{ width: "36%" }}
            variant="error"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            Due amount : {dueAmount}
          </Text> */}
        </TopView>
        <BottomView>
          <TouchableOpacity onPress={renderTaost}>
            <Text variant="labelSmall">View Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={renderTaost}
          >
            <Text variant="labelSmall">ordered items{"   "}</Text>
            <FontAwesome5 name="receipt" size={16} color="#689F38" />
          </TouchableOpacity>
        </BottomView>
      </PaymentDetailSection>
    </MainContainer>
  );
}

import React, { useState, useContext, useEffect } from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../../global/components/typography/text.component";
import {
  TimeSection,
  OrderDetailSection,
  MainContainer,
  BottomContainer,
  BottomView,
  TopView,
} from "./orderHistory.info.style";
import { ToastAndroid, Platform, AlertIOS } from "react-native";
import ItemOrderedOverlay from "./itemsOrderedOverlay";
export default function OrderHistoryInfo({ orderDetails = {} }) {

  const [showNotesFlag, setShowNotesFlag] = useState(false);
  const [showItemsOverLayFlag, setShowItemsOverLayFlag] = useState(false);

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
    Notes = "test",
    orderedProducts=[]
  } = orderDetails;
  const renderTaost = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("coming soon", ToastAndroid.SHORT);
    } else {
      AlertIOS.alert("coming soon");
    }
  };

  const toggleNotes =()=>{
    setShowNotesFlag(!showNotesFlag);
  
  }
  const toggleitemOverLay =()=>{
    setShowItemsOverLayFlag(!showItemsOverLayFlag);
  
  }

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
      <OrderDetailSection>
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
          <TouchableOpacity onPress={toggleNotes}>
          {!showNotesFlag && <Text variant="labelSmall" >View Notes</Text>}
          {showNotesFlag && <Text variant="labelSmall" >Hide Notes</Text>}
          </TouchableOpacity>
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
        
        <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={toggleitemOverLay}
          >
            <Text variant="labelSmall">ordered items{"   "}</Text>
            <FontAwesome5 name="receipt" size={16} color="#689F38" />
          </TouchableOpacity>
          {showNotesFlag && <Text variant="labelSmall" adjustsFontSizeToFit numberOfLines={2}>
            {Notes.length>0?Notes:"No notes available"}
          </Text>}
          {/* <Text variant="labelSmall">{orderedProducts.length}{" "}items ordered</Text> */}
        </BottomView>
      </OrderDetailSection>
      {showItemsOverLayFlag && 
     
     <ItemOrderedOverlay
     orderDetails={orderDetails}
     toggleitemOverLay={toggleitemOverLay}
        />
     }
    </MainContainer>
  );
}

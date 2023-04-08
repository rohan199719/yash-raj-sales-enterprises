import { StatusBar } from "expo-status-bar";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { Overlay } from "react-native-elements";
import { DataTable } from "react-native-paper";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import { Text } from "../../global/components/typography/text.component";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  AntDesign,
  Fontisto,
} from "@expo/vector-icons";
const MainView = styled(View)`
  height:400px;
  width: 300px;
  align-items: center;
  justify-content: flex-start;
`;
const HeaderElement = styled(View)`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
`;
const TitleElement = styled(View)`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
`;

const Divider = styled(View)`
  height: 16px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.ui.quaternary};
`;
 const DealerInfoView = styled(View)`
  width: 100%;
  padding: 8px;
  margin-left: 8px;
  align-items: flex-start;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.ui.tertiary};
`;


export default function ItemOrderedOverlay({ orderDetails,toggleitemOverLay }) {
  const [name, setName] = useState("");
 
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
  const renderTaost = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(message);
    }
  };

  return (
    <Overlay>
      <MainView>
        <HeaderElement>
        <Text variant="title" adjustsFontSizeToFit numberOfLines={1}>
           Order Date: {" "}
            {orderDetails.orderDateTimestamp.toDate().getDate().toString()}{"-"}
            {months[orderDetails.orderDateTimestamp.toDate().getMonth()]}{"-"}
            {orderDetails.orderDateTimestamp.toDate().getFullYear()}
          </Text>
          <TouchableOpacity onPress={toggleitemOverLay}>
            <FontAwesome name="close" size={18} color="green" />
          </TouchableOpacity>
        </HeaderElement>
       <Divider/>
       <DealerInfoView>
       
      <Text variant="caption" adjustsFontSizeToFit numberOfLines={1}>
            Dealer name :{"    "} {orderDetails.dealerName.toUpperCase()}
          </Text>
          <Text variant="caption" adjustsFontSizeToFit numberOfLines={1}>
            Billing amount: {" "}{orderDetails.netBillingAmount}
          </Text>

        
 
      </DealerInfoView>
      <Divider/>
      <TitleElement>
          <Text variant="title">Ordered Items</Text>
        </TitleElement>
        <Divider/>
       <ScrollView style={{height:'100%',width:'100%'}}>
      <DataTable>
        <DataTable.Header
          style={{
            backgroundColor: "#DCEDC8",
            justifyContent: "space-evenly",
          }}
        >
          <DataTable.Title style={{ flex: 3 }}> Item Name</DataTable.Title>
          <DataTable.Title style={{ flex: 3 }}>Units</DataTable.Title>
          <DataTable.Title style={{ flex: 1.5 }}>Net Price</DataTable.Title>
          <DataTable.Cell style={{ flex: 0.6 }}></DataTable.Cell>
        </DataTable.Header>
        {orderDetails.orderedProducts.map((item) => {
          return (
            <DataTable.Row
              style={{
                justifyContent: "space-evenly",
              }}
            >
              <DataTable.Cell style={{ flex: 3 }}>
                <Text variant="caption" adjustsFontSizeToFit numberOfLines={1}>
                  {item.productName}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 3 }}>
                <Text variant="caption" adjustsFontSizeToFit numberOfLines={1}>
                  {item.units} {item.unitName}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 1.5 }}>
                <Text variant="caption" adjustsFontSizeToFit numberOfLines={1}>
                  {item.netPrice}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
      </ScrollView>
      <Divider/>
     
      </MainView>
    </Overlay>
  );
}

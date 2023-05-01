import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import DealerList from "../components/dealers.style";
import { Searchbar } from "react-native-paper";
import { PaymentHistoryContext } from "../../../services/paymentHistory/paymentHistory.context";
import { FlatList } from "react-native";
import PaymentHistoryDetailedInfo from "../components/paymentHistoryDetailed.info";
export default function Payments({ navigation }) {
  const navigateBack = () => {
    navigation.navigate("Home");
  };
  

  const { paymentHistory, isLoading, error, fetchPaymentHistory } =
    useContext(PaymentHistoryContext);

    useEffect(() => {
      fetchPaymentHistory();
      console.log(
        "payment relaoded"
      );
    }, []);
  return (
    isLoading? <ActivityIndicator size="large" color="#689F38" style={{position:"absolute",right:'50%',left:'50%',top:'50%',bottom:'50%'}}/> :<View style={{height:'100%'}}>
      {paymentHistory && <ScrollView>
            {paymentHistory.map((item) => {
              return <PaymentHistoryDetailedInfo paymentDetails={item} key={item.paymentDateTimestampString}/>;
            })}
          </ScrollView>}
      
      {/* <FlatList
        data={paymentHistory}
        renderItem={({ item }) => {
          return (
            <PaymentHistoryDetailedInfo paymentDetails={item} />
          );
        }}
        keyExtractor={(item) => item.paymentDateTimestampString}
      /> */}
    </View>
  );
}

import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
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
  

  const { paymentHistory, isLaoding, error, fetchPaymentHistory } =
    useContext(PaymentHistoryContext);
  return (
    <View>
      <FlatList
        data={paymentHistory}
        renderItem={({ item }) => {
          console.log("in render item", item);
          return (
            <PaymentHistoryDetailedInfo paymentDetails={item} />
          );
        }}
        keyExtractor={(item) => item.dealerId}
      />
    </View>
  );
}

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
import DealerInfoCard from "../components/dealer.info.card";
import { Searchbar } from "react-native-paper";
import { DealersContext } from "../../../services/dealers/dealers.context";
import { FlatList } from "react-native";
import { OrderHistoryContext } from "../../../services/orders/orderHistory.context";
import OrderHistoryDetailedInfo from "../components/orderHistoryDeatailed.info";

export default function Orders({ navigation }) {
  const navigateBack = () => {
    navigation.navigate("Home");
  };


  const {orderHistory,
         isLoading,
          error,
         } = useContext(OrderHistoryContext);
  return (
    <View>
      <FlatList
        data={orderHistory}
        renderItem={({ item }) => {
          console.log("in render item", item);
          return (
               <OrderHistoryDetailedInfo orderDetails={item} />
          );
        }}
        keyExtractor={(item) => item.dealerId}
      />
    </View>
  );
}

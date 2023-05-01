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
  useEffect(() => {
    fetchOrderHistory();
    console.log(
      "order relaoded"
    );
  }, []);

  const {orderHistory,
         fetchOrderHistory,
         isLoading,
          error,
         } = useContext(OrderHistoryContext);
  return (isLoading? <ActivityIndicator size="large" color="#689F38" style={{position:"absolute",right:'50%',left:'50%',top:'50%',bottom:'50%'}}/> :<View>
           {orderHistory && <ScrollView>
            {orderHistory.map((item) => {
              return <OrderHistoryDetailedInfo orderDetails={item} key={item.orderDateTimestampString} />;
            })}
          </ScrollView>}
   
    {/* <FlatList
      data={orderHistory}
      renderItem={({ item }) => {
        return (
             <OrderHistoryDetailedInfo orderDetails={item} />
        );
      }}
      keyExtractor={(item) => item.orderDateTimestampString}
    /> */}
  </View>
  );
}

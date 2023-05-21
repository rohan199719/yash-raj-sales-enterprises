import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import { Foundation } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import DealerList from "../components/dealers.style";
import { Searchbar } from "react-native-paper";
import { PaymentHistoryContext } from "../../../services/paymentHistory/paymentHistory.context";
import { FlatList } from "react-native";
import ExportPaymenttOverlay from "../components/exportPaymenttOverlay";
import PaymentHistoryDetailedInfo from "../components/paymentHistoryDetailed.info";
import styled from "styled-components";
export const PaymentListView = styled(View)`
  flex: 1;
  justify-content: flex-start;
`;
export default function Payments({ navigation }) {
  const navigateBack = () => {
    navigation.navigate("Home");
  };
  const [exportPaymentOverlayOpenFlag, setExportPaymentOverlayOpenFlag] =
    useState(false);

  const { paymentHistory, isLoading, error, fetchPaymentHistory } = useContext(
    PaymentHistoryContext
  );
  const toggleExportPaymentOverlay = () => {
    setExportPaymentOverlayOpenFlag(!exportPaymentOverlayOpenFlag);
  };
  useEffect(() => {
    fetchPaymentHistory();
    console.log("payment relaoded");
  }, []);

  return isLoading ? (
    <ActivityIndicator
      size="large"
      color="#689F38"
      style={{
        position: "absolute",
        right: "50%",
        left: "50%",
        top: "50%",
        bottom: "50%",
      }}
    />
  ) : (
    <View style={{ height: "100%" }}>
      {paymentHistory && (
        <PaymentListView>
          {/* <View style={{ backgroundColor:"#689F38", height:64, justifyContent: "center",alignItems:"flex-end",paddingEnd:20,marginTop:5}}>
          <TouchableOpacity><Foundation name="page-export-pdf" size={36} color="#DCEDC8" /></TouchableOpacity>
          </View> */}
          <ScrollView>
            {paymentHistory.map((item) => {
              return (
                <PaymentHistoryDetailedInfo
                  paymentDetails={item}
                  key={item.paymentDateTimestampString}
                />
              );
            })}
          </ScrollView>
          <View>
            <TouchableOpacity
              style={{
                height: 60,
                width: 60,
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
                backgroundColor: "#689F38",
                bottom: 40,
                right: 12,
                elevation: 16,
                borderColor: "#DCEDC8",
              }}
              onPress={toggleExportPaymentOverlay}
            >
              <Foundation name="page-export-pdf" size={24} color="#DCEDC8" />
              <Text style={{ color: "#DCEDC8" }}>Export</Text>
            </TouchableOpacity>

            {exportPaymentOverlayOpenFlag && (
              <ExportPaymenttOverlay
                toggleExportPaymentOverlay={toggleExportPaymentOverlay}
              />
            )}
          </View>
        </PaymentListView>
      )}

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

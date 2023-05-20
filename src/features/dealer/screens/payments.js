import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import { Foundation } from "@expo/vector-icons";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
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
  var paymentHistoryCount = 1;
  useEffect(() => {
    fetchPaymentHistory();
    console.log("payment relaoded");
  }, []);

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
  const paymentHistorydummy = [];
  const officeAdress = " Daltonganj Ladi Palamu jharkhand 822101";
  const officeMobileNumberAndEmail = "Contact:08825189857";
  var fromDate = "";
  var toDate = "";
  // Add payment objects to the paymentHistory array
  paymentHistorydummy.push({
    dealerName: "John Doe",
    dueAmount: 100,
    paymentDate: "2023-05-01",
  });
  paymentHistorydummy.push({
    dealerName: "Jane Smith",
    dueAmount: 200,
    paymentDate: "2023-05-05",
  });

  const preparePdf = async (
    fromDateEntry,
    toDateEntry,
    filteredPaymentHistory
  ) => {
    console.log("inside prepare pdf");
    fromDate = fromDateEntry;
    toDate = toDateEntry;
    const html = `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
    
        h1 {
          text-align: center;
          margin-top: 20px;
          margin-bottom:0;
        }
        h3 {
          text-align: center;
          margin-top:0;
        }
        hr {
          border: none;
          border-top: 1px solid black;
          margin: 10px 0;
        }
    
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

     
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
        }
      </style>
    </head>
    <body>
      <h1>YASH RAJ SALES ENTERPRISES</h1>
<h3>${officeAdress}</h3>
      <hr>
      <h2>Payment History-    (From: ${fromDate} To ${toDate})</h2>
      <table>
        <thead>
          <tr>
          <th>S.No.</th>
            <th>Dealer Name</th>
            <th>Payment Date</th>
            <th>Paid Amount</th>
            <th>Recieved By</th>
            <th>Payment mode</th>
          </tr>
        </thead>
        <tbody>
          ${
            filteredPaymentHistory
              ? filteredPaymentHistory
                  .reverse()
                  .map(
                    (payment) => `
          <tr>
          <td>${paymentHistoryCount++}</td>
          <td>${payment.dealerName}</td>
            <td>${
              months[payment.paymentDateTimestamp.toDate().getMonth()]
            }${" "}${payment.paymentDateTimestamp
                      .toDate()
                      .getDate()
                      .toString()}${" "}${payment.paymentDateTimestamp
                      .toDate()
                      .getFullYear()
                      .toString()}</td>
            <td>${payment.paymentAmount}</td>
            <td>${payment.recievedBy}</td>
            <td>${payment.paymentMode}</td>
          </tr>`
                  )
                  .join("")
              : paymentHistorydummy
                  .map(
                    (payment) => `
          <tr>
            <td>${payment.dealerName}</td>
            <td>${payment.paymentAmount}</td>
            <td>${payment.paymentDate}</td>
          </tr>`
                  )
                  .join("")
          }
        </tbody>
      </table>

    </body>
    </html>
    `;
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });
    await shareAsync(file.uri);
    console.log("exiting prepare pdf");
  };

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
                preparePdf={preparePdf}
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

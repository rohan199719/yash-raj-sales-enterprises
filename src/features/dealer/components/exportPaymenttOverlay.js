import { StatusBar } from "expo-status-bar";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { Overlay } from "react-native-elements";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
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
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { PaymentHistoryContext } from "../../../services/paymentHistory/paymentHistory.context";
const MainView = styled(View)`
  height: 300px;
  width: 220px;
  align-items: center;
  justify-content: flex-start;
`;
const HeaderElement = styled(View)`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
`;
const Divider = styled(View)`
  height: 16px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.ui.quaternary};
`;
const FormView = styled(View)`
  height: 100%;
  width: 300px;

  align-items: flex-start;
  justify-content: flex-start;
`;

const ProductInput = styled(View)`
  width: 300px;
  background-color: #f1f1f1;
  align-items: center;
  justify-content: flex-start;
  border-width: 1px;
  border-color: #689f38;
  padding-left: 2px;
  padding-right: 2px;
`;
const ProductInputSubViewBottom = styled(View)`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  padding-top: 4px;
`;
const ProductInputSubViewTop = styled(View)`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  padding-top: 4px;
`;

const SubmitButton = styled(TouchableOpacity)`
  width: 100%;
  height: 40px;
  margin-top: 20px;
  border-radius: 4px;
  background-color: #689f38;
  align-items: center;
  justify-content: center;
`;
const SubmitButtonText = styled(Text)`
  color: #fff;
  font-weight: normal;
  font-size: 18px;
  font-family: sans-serif-medium;
`;

const ErrorMessageView = styled(View)`
  width: 300px;
  height: 30px;
  align-items: center;
  justify-content: flex-end;
`;
export default function ExportPaymenttOverlay({ toggleExportPaymentOverlay }) {
  const [fromDateEntry, setFromDateEntry] = useState("");
  const [toDateEntry, setToDateEntry] = useState("");
  const [toDateTimeStampString, setToDateTimeStampString] = useState("");
  const [fromDateTimeStampString, setFromDateTimeStampString] = useState("");
  const [AuthPIN, setAuthPIN] = useState("");
  const [toDate, setToDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [displaymode, setMode] = useState("date");
  const [isDisplayFromDatePicker, setDisplayFromDatePicker] = useState(false);
  const [isDisplayToDatePicker, setDisplayToDatePicker] = useState(false);
  const [inputValidationError, setInputValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPaymentHistory, setFilteredPaymentHistory] = useState([]);

  const {
    paymentHistory,
    error,
    fetchPaymentHistory,
    fetchPaymentHistoryWithfilter,
    paymentHistoryWithFilter,
  } = useContext(PaymentHistoryContext);

  useEffect(() => {
    console.log("export payment overlay relaoded");

    const today = new Date();
    console.log("Before: ", today);
    setToDateEntry(
      today.getDate() +
        "-" +
        parseInt(today.getMonth() + 1) +
        "-" +
        today.getFullYear()
    );
    setToDateTimeStampString(today.valueOf());
    const month = today.getMonth();
    today.setMonth(month - 1);
    console.log("after: ", today);
    setFromDateEntry(
      today.getDate() +
        "-" +
        parseInt(today.getMonth() + 1) +
        "-" +
        today.getFullYear()
    );
    //const oneMonthBack = today.setMonth(month - 1);
    // today.setDate(1);
    setFromDateTimeStampString(today.valueOf());
    setFromDate(today);
    var reveresed = [];
    paymentHistory.forEach((element) => {
      reveresed.unshift(element);
    });
    setFilteredPaymentHistory(reveresed);
  }, []);

  const isInputValid = () => {
    var fromDateCopy = fromDate;
    var toDateCpy = toDate;
    fromDateCopy.setHours(0, 0, 0, 0);
    toDateCpy.setHours(0, 0, 0, 0);
    console.log(
      "to date is " +
        fromDateCopy.valueOf() +
        " fromDate is" +
        toDateCpy.valueOf()
    );
    if (
      toDate.valueOf() > new Date().valueOf() ||
      fromDate.valueOf() > new Date().valueOf()
    ) {
      console.log("date range must not include future date");
      setInputValidationError("date range must not include future date");
      renderTaost("Date range must not include future date");
      return false;
    }
    if (toDate.valueOf() < fromDate.valueOf()) {
      console.log("to date must be gratede than from date");
      setInputValidationError(
        "To date must be gratede than or equal to from date"
      );
      renderTaost("To date must be gratede than or equal to from date");
      return false;
    }

    // if (AuthPIN === "") {
    //   console.log("AuthPIN is mandatory");
    //   setInputValidationError("AuthPIN is mandatory");
    //   renderTaost("AuthPIN is mandatory");
    //   return false;
    // }
    setInputValidationError("");
    return true;
  };

  const openFromDatePicker = () => {
    setDisplayFromDatePicker(true);
  };
  const openToDatePicker = () => {
    setDisplayToDatePicker(true);
  };

  const renderTaost = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(message);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if (isInputValid()) {
      await generatePdf();
      setIsLoading(false);
      toggleExportPaymentOverlay();
    } else {
      setIsLoading(false);
      return;
    }
  };
  const retrievePaymentHistoryWithFilterAndPrepare = async (
    fromDate,
    toDate
  ) => {
    await fetchPaymentHistoryWithfilter(fromDate, toDate)
      .then((snapshot) => {
        const paymentHistoryList = [];
        snapshot.docs.forEach((doc) => {
          paymentHistoryList.push({ ...doc.data(), id: doc.id });
        });
        console.log(
          "payment history list count after fetch is ",
          paymentHistoryList.length
        );
        preparePdf(fromDateEntry, toDateEntry, paymentHistoryList.reverse());
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const generatePdf = async () => {
    console.log("generating PDF");
    var filteredPaymentHistoryCopy = filteredPaymentHistory;
    toDate.setHours(0, 0, 0, 0);
    toDate.setDate(toDate.getDate() + 1);
    fromDate.setHours(0, 0, 0, 0);
    const oneMonthBackDate = new Date();
    oneMonthBackDate.setMonth(oneMonthBackDate.getMonth() - 1);
    oneMonthBackDate.setHours(0, 0, 0, 0);
    if (fromDate.valueOf() < oneMonthBackDate.valueOf()) {
      console.log("fetch required");
      await retrievePaymentHistoryWithFilterAndPrepare(fromDate, toDate);
    } else {
      var tommorowMidnight = new Date();
      tommorowMidnight.setHours(0, 0, 0, 0);
      tommorowMidnight.setDate(tommorowMidnight.getDate() + 1);
      if (
        toDate.valueOf() == tommorowMidnight.valueOf() &&
        fromDate.valueOf() == oneMonthBackDate.valueOf()
      ) {
        console.log("equal");
        await preparePdf(
          fromDateEntry,
          toDateEntry,
          filteredPaymentHistoryCopy
        );
      } else {
        console.log("subset");
        filteredPaymentHistoryCopy = filteredPaymentHistoryCopy.filter(
          (paymentDetail) =>
            paymentDetail.paymentDateTimestampString >= fromDate.valueOf() &&
            paymentDetail.paymentDateTimestampString < toDate.valueOf()
        );
        await preparePdf(
          fromDateEntry,
          toDateEntry,
          filteredPaymentHistoryCopy
        );
      }
    }
    filteredPaymentHistoryCopy = [];
    console.log("PDF generated");
  };

  var paymentHistoryCount = 1;
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
      <h2>Payment History-    (From: ${fromDateEntry} To ${toDateEntry})</h2>
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
    const fileName =
      "PaymentHistory(" + fromDateEntry + " to " + toDateEntry + ").pdf";
    const newPath = FileSystem.documentDirectory + fileName;
    await FileSystem.copyAsync({
      from: file.uri,
      to: newPath,
    });
    console.log("new path is " + newPath);
    await shareAsync(newPath);
    console.log("exiting prepare pdf");
  };
  const changeSelectedFromDate = (event, selectedDate) => {
    setDisplayFromDatePicker(false);
    const currentDate = selectedDate || fromDate;
    const dateString =
      currentDate.getDate() +
      "-" +
      parseInt(currentDate.getMonth() + 1) +
      "-" +
      currentDate.getFullYear();
    setFromDate(currentDate);
    setFromDateEntry(dateString);
    setFromDateTimeStampString(currentDate.valueOf());
    console.log("selectd from Date is", selectedDate);
    console.log("selectd from Date is string ", dateString);
  };

  const changeSelectedToDate = (event, selectedDate) => {
    setDisplayToDatePicker(false);
    const currentDate = selectedDate || toDate;
    const dateString =
      currentDate.getDate() +
      "-" +
      parseInt(currentDate.getMonth() + 1) +
      "-" +
      currentDate.getFullYear();
    setToDateEntry(dateString);
    setToDate(currentDate);
    setToDateTimeStampString(currentDate.valueOf());
    console.log("selectd to Date is", selectedDate);
    console.log("selectd to Date is string ", dateString);
  };

  return (
    <Overlay>
      <MainView>
        <HeaderElement>
          <Text variant="title">Export Payment History</Text>
          <TouchableOpacity onPress={toggleExportPaymentOverlay}>
            <FontAwesome name="close" size={24} color="green" />
          </TouchableOpacity>
        </HeaderElement>
        {/* {true ? (
          <ErrorMessageView>
            <Text variant="error">{inputValidationError}</Text>
          </ErrorMessageView>
        ) : null} */}
        <ScrollView
          style={{
            flex: 1,
            marginTop: 20,
          }}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <FormView>
            <View
              style={{
                wwidth: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Text variant="title">From</Text>
            </View>
            <View
              style={{
                backgroundColor: "white",
                marginTop: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={openFromDatePicker}>
                <MaterialIcons name="date-range" size={40} color="#689F38" />
              </TouchableOpacity>
              <TextInput
                style={{
                  width: "40%",
                  marginLeft: 8,
                  underlineColorAndroid: "transparent",
                  backgroundColor: "#DCEDC8",
                }}
                label="From Date*"
                value={fromDateEntry}
                onChangeText={(txt) => {
                  setFromDateEntry(txt);
                }}
                disabled="true"
                textColor="#689F38"
                activeUnderlineColor="#689F38"
              />
            </View>
            <View
              style={{
                wwidth: "100%",
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Text variant="title">To</Text>
            </View>
            <View
              style={{
                backgroundColor: "white",
                marginTop: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={openToDatePicker}>
                <MaterialIcons name="date-range" size={40} color="#689F38" />
              </TouchableOpacity>
              <TextInput
                style={{
                  width: "40%",
                  marginLeft: 8,
                  underlineColorAndroid: "transparent",
                  backgroundColor: "#DCEDC8",
                }}
                label="To Date*"
                value={toDateEntry}
                onChangeText={(txt) => {
                  setToDateEntry(txt);
                }}
                disabled="true"
                textColor="#689F38"
                activeUnderlineColor="#689F38"
              />
            </View>

            {isDisplayFromDatePicker && (
              <DateTimePicker
                testID="dateTimePickerFrom"
                value={fromDate}
                mode={displaymode}
                is24Hour={true}
                display="default"
                onChange={changeSelectedFromDate}
              />
            )}
            {isDisplayToDatePicker && (
              <DateTimePicker
                testID="dateTimePickerTo"
                value={toDate}
                mode={displaymode}
                is24Hour={true}
                display="default"
                onChange={changeSelectedToDate}
              />
            )}

            {/* <TextInput
              style={{
                width: "100%",
                backgroundColor: "#DCEDC8",
                marginTop: 30,
              }}
              label="Autherization PIN*"
              value={AuthPIN}
              onChangeText={(txt) => {
                setAuthPIN(txt);
              }}
              secureTextEntry
              textColor="#689F38"
              activeUnderlineColor="#689F38"
            /> */}
          </FormView>
        </ScrollView>
        <SubmitButton onPress={handleSubmit} disabled={isLoading}>
          {!isLoading ? (
            <SubmitButtonText>Export</SubmitButtonText>
          ) : (
            <ActivityIndicator
              size="large"
              color="#FFFFFF"
              style={{
                position: "absolute",
                right: "50%",
                left: "50%",
                top: "50%",
                bottom: "50%",
              }}
            />
          )}
        </SubmitButton>
      </MainView>
    </Overlay>
  );
}

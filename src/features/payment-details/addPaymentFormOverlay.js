import { StatusBar } from "expo-status-bar";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { Overlay } from "react-native-elements";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { PaymentHistoryContext } from "../../services/paymentHistory/paymentHistory.context";
import { DealersContext } from "../../services/dealers/dealers.context";
import { Text } from "../global/components/typography/text.component";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
const MainView = styled(View)`
  height: 400px;
  width: 300px;
  align-items: center;
  justify-content: flex-start;
`;
const HeaderElement = styled(View)`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
`;
const FormView = styled(View)`
  height: 100%;
  width: 300px;

  align-items: center;
  justify-content: flex-start;
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
export default function AddPaymentFormOverlay({
  togglePaymentOverlay,
  dealer,
  submitNewPayment,
}) {
  const [PaidAmount, setPaidAmount] = useState("");
  const [AuthPIN, setAuthPIN] = useState("");
  const [PaymentDate, setPaymentDate] = useState("");
  const [Notes, setNotes] = useState("");
  const [mydate, setDate] = useState(new Date());
  const [displaymode, setMode] = useState("date");
  const [isDisplayDatePicker, setDisplayDatePicker] = useState(false);
  const [inputValidationError, setInputValidationError] = useState("");
  const {
    isLoading,
    error,
    sucess,
    AddNewPaymentHistory,
    paymentHistory,
    fetchPaymentHistoryByDealerId,
  } = useContext(PaymentHistoryContext);
  const {
    isLaodingDealer,
    errorDealer,
    successDealerDb,
    updateDelearDueAmountById,
  } = useContext(DealersContext);
  const isInputValid = () => {
    if (PaidAmount === "") {
      console.log("recieved amount is mandatory");
      setInputValidationError("recieved amount is mandatory");
      return false;
    }
    if (PaymentDate === "") {
      console.log("payment date is mandatory");
      setInputValidationError("payment date is mandatory");
      return false;
    }
    if (isNaN(PaidAmount)) {
      console.log("recieved amount invalid");
      setInputValidationError("recieved amount invalid");
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    if (isInputValid()) {
      const remainingDue = Number(dealer.dueAmount) - Number(PaidAmount);
      console.log("remaining diue amount is ", remainingDue);
      const newPaymentHistory = {
        dealerId: dealer.dealerId,
        dealerName: dealer.name,
        dueAmount: remainingDue,
        paymentAmount: PaidAmount,
        remark: Notes,
        paymentDate: PaymentDate,
        paymentDateTimestampString:mydate.valueOf(),
        paymentDateTimestamp: Timestamp.fromDate(mydate),
      };
      dealer.dueAmount = remainingDue;
      submitNewPayment(newPaymentHistory);
    } else {
      console.log("error flag is " + inputValidationError);
      return;
    }
  };
  const handleSubmitPrev = () => {
    if (isInputValid()) {
      const remainingDue = Number(dealer.dueAmount) - Number(PaidAmount);
      console.log("remaining diue amount is ", remainingDue);
      const newPaymentHistory = {
        dealerId: dealer.dealerId,
        dealerName: dealer.name,
        dueAmount: remainingDue,
        paymentAmount: PaidAmount,
        remark: Notes,
        paymentDate: PaymentDate,
        paymentDateTimestamp: Timestamp.fromDate(mydate),
      };
      dealer.dueAmount = remainingDue;
      submitNewPayment(newPaymentHistory);
    } else {
      console.log("error flag is " + inputValidationError);
      return;
    }
  };
  const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || mydate;
    setDate(currentDate);
    const dateString =
      currentDate.getDate() +
      "/" +
      parseInt(currentDate.getMonth() + 1) +
      "/" +
      currentDate.getFullYear();
    setPaymentDate(dateString);
    console.log("selectd Date is", selectedDate);
    console.log("payment Date is", dateString);
    setDisplayDatePicker(false);
  };

  const openDatePicker = () => {
    setDisplayDatePicker(true);
  };
  useEffect(() => {
    console.log("paymentoverlay reloaded");
    console.log("sucess is", sucess);
  });
  return (
    <Overlay>
      <MainView>
        <HeaderElement>
          <Text variant="title">Add New Payment</Text>
          <TouchableOpacity onPress={togglePaymentOverlay}>
            <FontAwesome name="close" size={24} color="green" />
          </TouchableOpacity>
        </HeaderElement>
        {true ? (
          <ErrorMessageView>
            <Text variant="error">{inputValidationError}</Text>
          </ErrorMessageView>
        ) : null}
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
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "#DCEDC8",
                marginTop: 8,
                opacity: 0.6,
              }}
              label="Dealer Id"
              value={dealer.dealerId}
              disabled="true"
              textColor="#689F38"
              activeUnderlineColor="#689F38"
            />
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "#DCEDC8",
                marginTop: 8,
                opacity: 0.6,
              }}
              label="Dealer Name"
              value={dealer.name.toUpperCase()}
              disabled="true"
              textColor="#689F38"
              activeUnderlineColor="#689F38"
            />
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "#DCEDC8",
                marginTop: 8,
              }}
              label="Recieving Amount"
              value={PaidAmount}
              onChangeText={(txt) => {
                setPaidAmount(txt);
              }}
              keyboardType="number-pad"
              textColor="#689F38"
              activeUnderlineColor="#689F38"
            />
            <View
              style={{
                width: "100%",
                backgroundColor: "#DCEDC8",
                marginTop: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  underlineColorAndroid: "transparent",
                  backgroundColor: "#DCEDC8",
                }}
                label="Payment Date"
                value={PaymentDate}
                onChangeText={(txt) => {
                  setPaymentDate(txt);
                }}
                disabled="true"
                textColor="#689F38"
                activeUnderlineColor="#689F38"
              />
              <TouchableOpacity onPress={openDatePicker}>
                <MaterialIcons name="date-range" size={24} color="#689F38" />
              </TouchableOpacity>
            </View>

            {isDisplayDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={mydate}
                mode={displaymode}
                is24Hour={true}
                display="default"
                onChange={changeSelectedDate}
              />
            )}
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "#DCEDC8",
                marginTop: 8,
              }}
              label="Notes"
              value={Notes}
              onChangeText={(txt) => {
                setNotes(txt);
              }}
              multiline={true}
              textColor="#689F38"
              activeUnderlineColor="#689F38"
            />
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "#DCEDC8",
                marginTop: 8,
              }}
              label="Autherization PIN"
              value={AuthPIN}
              onChangeText={(txt) => {
                setAuthPIN(txt);
              }}
              secureTextEntry
              textColor="#689F38"
              activeUnderlineColor="#689F38"
            />
          </FormView>
        </ScrollView>
        <SubmitButton onPress={handleSubmit}>
          <SubmitButtonText>Submit</SubmitButtonText>
        </SubmitButton>
      </MainView>
    </Overlay>
  );
}

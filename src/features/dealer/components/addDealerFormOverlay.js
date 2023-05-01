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
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import { DealersContext } from "../../../services/dealers/dealers.context";
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
const MainView = styled(View)`
  height: 500px;
  width: 300px;
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

  align-items: center;
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
export default function AddDealerFormOverlay({ toggleAddDealerOverlay }) {
  const [dueAmount, setDueAmount] = useState("0");
  const [dealerId, setDealerId] = useState("");
  const [mobileNumer, setmobileNumer] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [buisnessName, setBuisnessName] = useState("");
  const [address, setAddress] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [Notes, setNotes] = useState("");
  const [AuthPIN, setAuthPIN] = useState("");
  const [mydate, setDate] = useState(new Date());
  const [displaymode, setMode] = useState("date");
  const [isDisplayDatePicker, setDisplayDatePicker] = useState(false);
  const [inputValidationError, setInputValidationError] = useState("");

  const {
    isLaodingDealer,
    errorDealer,
    successDealerDb,
    AddNewDealer,
    fetchDealers
  } = useContext(DealersContext);


  const isInputValid = () => {
    if (name === "") {
      console.log("name is mandatory");
      setInputValidationError("name is mandatory");
      return false;
    }
    if (mobileNumer === "") {
      console.log("mobile number is mandatory");
      setInputValidationError("mobile number is mandatory");
      return false;
    }
    if (isNaN(mobileNumer) || mobileNumer.length !=10 ) {
      console.log("mobile number  invalid");
      setInputValidationError("mobile number invalid");
      return false;
    }
    if (address === "") {
      console.log("address is mandatory");
      setInputValidationError("address is mandatory");
      return false;
    }
  
    if (isNaN(dueAmount)) {
      console.log("dueAmount invalid");
      setInputValidationError("dueAmount invalid");
      return false;
    }
    return true;
  };

  const openDatePicker = () => {
    setDisplayDatePicker(true);
  };

  const renderTaost = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(message);
    }
  };

  const handleSubmit = () => {
    if (isInputValid()) {
      const newDealer = {
        dealerId: "DL-",
        name: name,
        nickname: nickname,
        mobleNumer: mobileNumer,
        buisnessName: buisnessName,
        dueAmount: dueAmount!=""?dueAmount:0,
        address: address,
        Notes: Notes,
        entryDate: entryDate,
        entryDateTimestampString: mydate.valueOf(),
        entryDateTimestamp: Timestamp.fromDate(mydate),
        lastPaymentDate:"NA",
        lastFollow:"NA",    
        };
      newDealer.dealerId=newDealer.dealerId + newDealer.entryDateTimestampString
      AddNewDealerCall(newDealer);
      console.log("AddNewDealerCall sucess");
      renderTaost("Dealer added sucessfully");
      toggleAddDealerOverlay();
      fetchDealers();

    } else {
      console.log("error flag is " + inputValidationError);
      return;
    }
  };

  const AddNewDealerCall = (newDealer) => {
    AddNewDealer(newDealer);
  };

  const changeSelectedDate = (event, selectedDate) => {
    setDisplayDatePicker(false);
    const currentDate = selectedDate || mydate;
    const dateString =
      currentDate.getDate() +
      "/" +
      parseInt(currentDate.getMonth() + 1) +
      "/" +
      currentDate.getFullYear();
    setEntryDate(dateString);
    console.log("selectd Date is", selectedDate);
    console.log("order Date is", dateString);
    
  };

  return (
    <Overlay>
      <MainView>
        <HeaderElement>
          <Text variant="title">Add New Dealer</Text>
          <TouchableOpacity onPress={toggleAddDealerOverlay}>
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
         
              }}
              label="Dealer Name"
              value={name}
              textColor="#689F38"
              activeUnderlineColor="#689F38"
              onChangeText={(txt) => {
                setName(txt);
              }}
            />
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "#DCEDC8",
                marginTop: 8,
  
              }}
              label="Nickname"
              value={nickname}
              textColor="#689F38"
              activeUnderlineColor="#689F38"
              onChangeText={(txt) => {
                setNickname(txt);
              }}
            />
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "#DCEDC8",
                marginTop: 8,
        
              }}
              label="Mobile Number"
              value={mobileNumer}
              textColor="#689F38"
              activeUnderlineColor="#689F38"
              keyboardType="number-pad"
              onChangeText={(txt) => {
                setmobileNumer(txt);
              }}
            />
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "#DCEDC8",
                marginTop: 8,
        
              }}
              label="Buisness Name"
              value={buisnessName}
              textColor="#689F38"
              activeUnderlineColor="#689F38"
              onChangeText={(txt) => {
                setBuisnessName(txt);
              }}
            />
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "#DCEDC8",
                marginTop: 8,
     
              }}
              label="address"
              value={address}
              textColor="#689F38"
              activeUnderlineColor="#689F38"
              multiline={true}
              onChangeText={(txt) => {
                setAddress(txt);
              }}
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
                label="Entry Date"
                value={entryDate}
                onChangeText={(txt) => {
                  setEntryDate(txt);
                }}
                disabled="true"
                textColor="#689F38"
                activeUnderlineColor="#689F38"
              />
              <TouchableOpacity onPress={openDatePicker}>
                <MaterialIcons name="date-range" size={24} color="#689F38" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={{
                width: "100%",
                backgroundColor: "#DCEDC8",
                marginTop: 8,
              }}
              label="Initial Due Amount"
              value={dueAmount}
              textColor="#689F38"
              activeUnderlineColor="#689F38"
              onChangeText={(txt) => {
                setDueAmount(txt);
              }}
            />

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

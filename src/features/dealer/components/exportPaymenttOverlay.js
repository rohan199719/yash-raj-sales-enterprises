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
  height: 380px;
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
export default function ExportPaymenttOverlay({ toggleExportPaymentOverlay,preparePdf }) {
  
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


  useEffect(() => {
    console.log("export payment overlay relaoded");
    
    const today = new Date();
    console.log('Before: ', today);
    setToDateEntry(today.getDate() +
    "/" +
    parseInt(today.getMonth() + 1) +
    "/" +
    today.getFullYear())
    setToDateTimeStampString(today.valueOf());
    const month = today.getMonth();
    today.setMonth(month - 1);
    console.log('after: ',today);
    setFromDateEntry(today.getDate() +
    "/" +
    parseInt(today.getMonth() + 1) +
    "/" +
    today.getFullYear());
     //const oneMonthBack = today.setMonth(month - 1);
    // today.setDate(1);
    setFromDateTimeStampString(today.valueOf());
    

  }, []);


  const isInputValid = () => {
    console.log("to date is "+toDateTimeStampString+" fromDateTimeStampString is"+fromDateTimeStampString);
    if (toDateTimeStampString < fromDateTimeStampString) {
      console.log("to date must be gratede than from date");
      setInputValidationError("To date must be gratede than or equal to from date");
      renderTaost("To date must be gratede than or equal to from date");
      return false;
    }
    if (AuthPIN === "") {
      console.log("AuthPIN is mandatory");
      setInputValidationError("AuthPIN is mandatory");
      renderTaost("AuthPIN is mandatory");
      return false;
    }
    ()=>{setInputValidationError("")};
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

  const generatePdf= async ()=>{
    console.log("generating PDF");
   if(fromDate.getDate() >new Date().getDate()){
    renderTaost("comming soon");
   }else{
    await preparePdf();
   }
   console.log("PDF generated");
  }

  const changeSelectedFromDate = (event, selectedDate) => {
    setDisplayFromDatePicker(false);
    const currentDate = selectedDate || fromDate;
    const dateString =
      currentDate.getDate() +
      "/" +
      parseInt(currentDate.getMonth() + 1) +
      "/" +
      currentDate.getFullYear();
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
      "/" +
      parseInt(currentDate.getMonth() + 1) +
      "/" +
      currentDate.getFullYear();
      setToDateEntry(dateString);
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
         
            <View style={{wwidth: "100%", flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-start"}}><Text variant="title">From</Text></View>
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
            <View style={{wwidth: "100%",marginTop:10, flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-start"}}><Text variant="title">To</Text></View>
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
            
            <TextInput
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
            />
          </FormView>
        </ScrollView>
        <SubmitButton onPress={handleSubmit} disabled={isLoading}>
         {!isLoading? <SubmitButtonText>Export</SubmitButtonText> : <ActivityIndicator size="large" color="#FFFFFF" style={{position:"absolute",right:'50%',left:'50%',top:'50%',bottom:'50%'}}/>} 
        </SubmitButton>
      </MainView>
    </Overlay>
  );
}

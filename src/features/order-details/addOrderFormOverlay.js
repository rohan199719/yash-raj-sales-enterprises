import { StatusBar } from "expo-status-bar";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { Overlay } from "react-native-elements";
import AddedItemTable from "./addedItemTable";
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
import { OrderHistoryContext } from "../../services/orders/orderHistory.context";
import { DealersContext } from "../../services/dealers/dealers.context";
import { Text } from "../global/components/typography/text.component";
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
export default function AddOrderFormOverlay({ toggleOrderOverlay, dealer }) {
  const [billingAmount, setBillingAmount] = useState("");
  const [productName, setProductName] = useState("");
  const [orderedProduct, setOrderedProduct] = useState([]);
  const [quantity, setQuantity] = useState("");

  const [pricePerUnit, setPricePerUnit] = useState("");
  const [AuthPIN, setAuthPIN] = useState("");
  const [unitName, setUnitName] = useState("");
  const [netPrice, setNetPrice] = useState();
  const [netBillingAmmount, setNetBillingAmmount] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [Notes, setNotes] = useState("");
  const [mydate, setDate] = useState(new Date());
  const [displaymode, setMode] = useState("date");
  const [isDisplayDatePicker, setDisplayDatePicker] = useState(false);
  const [inputValidationError, setInputValidationError] = useState("");
  const [productInputValidationError, setProductInputValidationError] =
    useState("");

  const [newItemFormRenderFlag, setNewItemFormRenderFlag] = useState(true);
  const [addMoreButtomRenderFlag, setAddMoreButtomRenderFlag] = useState(false);

  const {
    isLoading,
    addNewOrderApiCallInprogress,
    error,
    addNewOrderSucess,
    AddNewOrder,
    orderHistory,
    fetchOrderHistoryByDealerId,
  } = useContext(OrderHistoryContext);
  const {
    isLaodingDealer,
    errorDealer,
    successDealerDb,
    updateDelearDueAmountById,
  } = useContext(DealersContext);

  const isInputValid = () => {
    if (orderDate === "") {
      console.log("order date is mandatory");
      setInputValidationError("order date is mandatory");
      return false;
    }
    if (isNaN(netBillingAmmount)) {
      console.log("net Billing Amount invalid");
      setInputValidationError("net Billing Amount invalid");
      return false;
    }
    return true;
  };

  const isProductInputValid = () => {
    if (productName === "") {
      console.log("product name is mandatory");
      setProductInputValidationError("product name is mandatory");
      return false;
    }
    if (quantity === "") {
      console.log("Units is mandatory");
      setProductInputValidationError("Units is mandatory");
      return false;
    }
    if (isNaN(quantity)) {
      console.log("quantity invalid");
      setProductInputValidationError("quantity is invalid");
      return false;
    }
    if (unitName === "") {
      console.log("unit  Name is mandatory");
      setProductInputValidationError("unit  Name is mandatory");
      return false;
    }
    if (pricePerUnit === "") {
      console.log("price/unit mandatory");
      setProductInputValidationError("price/unit mandatory");
      return false;
    }
    if (isNaN(pricePerUnit)) {
      console.log("price/Unit invalid");
      setProductInputValidationError("price/Unit is invalid");
      return false;
    }
    if (isNaN(netPrice)) {
      console.log("netPrice invalid");
      setProductInputValidationError("netPrice invalid");
      return false;
    }
    return true;
  };

  const renderNewOrderForm = () => {
    setNewItemFormRenderFlag(true);
    setAddMoreButtomRenderFlag(false);
  };
  const handleAddNewOrder = () => {
    if (isProductInputValid()) {
      setProductInputValidationError("");
      setNewItemFormRenderFlag(false);
      setAddMoreButtomRenderFlag(true);
      const orderProductList = orderedProduct;
      orderProductList.push({
        ...{
          productName: productName,
          units: quantity,
          pricePerUnit: pricePerUnit,
          netPrice: netPrice,
          unitName: unitName,
          key: productName,
        },
      });
      setOrderedProduct(orderProductList);
      setProductName("");
      setUnitName("");
      setNetPrice("");
      setPricePerUnit("");
      setQuantity("");
      calculateNetBilingAmount();

      console.log(orderedProduct);
    }
  };
  const calculateNetBilingAmount = () => {
    var netAmount = 0;
    orderedProduct.map((item) => {
      netAmount = netAmount + Number(item.netPrice);
      console.log("net amount is " + netAmount);
    });
    console.log("net amount is " + netAmount);
    setNetBillingAmmount(netAmount.toString());
  };
  const calculateAmountAfterDelete = () => {
    calculateNetBilingAmount;
  };
  const deleteAddedProduct = (key) => {
    console.log("inside delete method key is " + key);
    const orderProductList = orderedProduct.filter((item) => item.key !== key);
    setOrderedProduct(orderProductList);
    {
      calculateAmountAfterDelete;
    }
    console.log(orderProductList);
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
      const newOrder = {
        dealerId: dealer.dealerId,
        dealerName: dealer.name,
        orderedProducts: orderedProduct,
        netBillingAmount: netBillingAmmount,
        Notes: Notes,
        orderDate: orderDate,
        orderDateTimestamp: Timestamp.fromDate(mydate),
      };
      AddNewOrderCall(newOrder);
      console.log("addNewOrderSucess is ", addNewOrderSucess);
      while (addNewOrderApiCallInprogress) {
        console.log("isLaoding loop to wait");
        continue;
      }
      if (addNewOrderSucess) {
        console.log("AddNewOrderCall sucess");
        const newDueAmount =
          Number(dealer.dueAmount) + Number(netBillingAmmount);
        dealer.dueAmount = newDueAmount;
        dealer.lastOrderDate = orderDate;
        updateDelearDueAmountById(dealer);

        console.log("dealer due ammount add sucess");
        renderTaost("order added sucessfully");
        toggleOrderOverlay();
        //fetchPaymentHistoryByDealerId(dealer.dealerId);
        console.log("is loading is " + isLoading);
      } else {
        console.log("AddNewOrderCall failed");
      }
    } else {
      console.log("error flag is " + inputValidationError);
      return;
    }
  };

  const AddNewOrderCall = (newOrder) => {
    AddNewOrder(newOrder);
  };

  const calculateNetPrice = (quantity, pricePerUnit) => {
    (quantity, pricePerUnit) => {
      setNetPrice((Number(quantity) * Number(pricePerUnit)).toString());
    };
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
    setOrderDate(dateString);
    console.log("selectd Date is", selectedDate);
    console.log("order Date is", dateString);
    setDisplayDatePicker(false);
  };

  const openDatePicker = () => {
    setDisplayDatePicker(true);
  };

  useEffect(() => {
    calculateNetBilingAmount();
    console.log("addNewOrderSucess is", addNewOrderSucess);
  });
  return (
    <Overlay>
      <MainView>
        <HeaderElement>
          <Text variant="title">Add New Order</Text>
          <TouchableOpacity onPress={toggleOrderOverlay}>
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
                label="Order Date"
                value={orderDate}
                onChangeText={(txt) => {
                  setOrderDate(txt);
                }}
                disabled="true"
                textColor="#689F38"
                activeUnderlineColor="#689F38"
              />
              <TouchableOpacity onPress={openDatePicker}>
                <MaterialIcons name="date-range" size={24} color="#689F38" />
              </TouchableOpacity>
            </View>
            <Divider />

            <AddedItemTable
              product={orderedProduct}
              deleteAddedProduct={deleteAddedProduct}
            />
            <Divider />
            {newItemFormRenderFlag ? (
              <ProductInput>
                <TextInput
                  style={{
                    width: "100%",
                    backgroundColor: "#DCEDC8",
                    marginHorizontal: 8,
                  }}
                  label={<Text style={{ fontSize: 15 }}>Product Name</Text>}
                  value={productName}
                  onChangeText={(txt) => {
                    setProductName(txt);
                  }}
                  textColor="#689F38"
                  activeUnderlineColor="#689F38"
                />
                <ProductInputSubViewTop>
                  <TextInput
                    style={{
                      flex: 1,
                      backgroundColor: "#DCEDC8",
                      marginRight: 8,
                    }}
                    label={<Text style={{ fontSize: 12 }}>Units</Text>}
                    value={quantity}
                    onChangeText={(txt) => {
                      setQuantity(txt);
                      setNetPrice(
                        (Number(txt) * Number(pricePerUnit)).toString()
                      );
                    }}
                    keyboardType="number-pad"
                    textColor="#689F38"
                    activeUnderlineColor="#689F38"
                  />
                  <TextInput
                    style={{
                      flex: 1,
                      backgroundColor: "#DCEDC8",
                      marginRight: 8,
                    }}
                    label={<Text style={{ fontSize: 12 }}>Unit Name</Text>}
                    value={unitName}
                    onChangeText={(txt) => {
                      setUnitName(txt);
                    }}
                    textColor="#689F38"
                    activeUnderlineColor="#689F38"
                  />
                  <TextInput
                    style={{
                      flex: 1,
                      backgroundColor: "#DCEDC8",
                    }}
                    label={<Text style={{ fontSize: 12 }}>Price/unit</Text>}
                    value={pricePerUnit}
                    onChangeText={(txt) => {
                      setPricePerUnit(txt);
                      setNetPrice((Number(quantity) * Number(txt)).toString());
                    }}
                    keyboardType="number-pad"
                    textColor="#689F38"
                    activeUnderlineColor="#689F38"
                  />
                </ProductInputSubViewTop>

                <ProductInputSubViewBottom>
                  <TextInput
                    style={{
                      flex: 2,
                      backgroundColor: "#DCEDC8",
                    }}
                    label={<Text style={{ fontSize: 15 }}>Net Price</Text>}
                    value={netPrice}
                    disabled="true"
                    keyboardType="number-pad"
                    textColor="#689F38"
                    activeUnderlineColor="#689F38"
                  />
                  <View
                    style={{
                      flex: 1,

                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity onPress={handleAddNewOrder}>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 2,
                          borderRadius: 4,
                          borderColor: "#689F38",
                          padding: 2,
                          width: 80,
                          height: 44,
                          backgroundColor: "white",
                        }}
                      >
                        <Text variant="title">Add</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </ProductInputSubViewBottom>
                <ErrorMessageView>
                  <Text variant="error">{productInputValidationError}</Text>
                </ErrorMessageView>
              </ProductInput>
            ) : null}
            <Divider />
            {addMoreButtomRenderFlag ? (
              <TouchableOpacity
                style={{ marginRight: 8 }}
                onPress={renderNewOrderForm}
                disabled={newItemFormRenderFlag}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderRadius: 4,
                    borderColor: "#689F38",
                    padding: 2,
                  }}
                >
                  <Fontisto
                    name="shopping-basket-add"
                    size={25}
                    color="#689F38"
                  />
                  <Text variant="caption">Add more</Text>
                </View>
              </TouchableOpacity>
            ) : null}
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "#DCEDC8",
                marginTop: 8,
              }}
              label="Net Billing Amount"
              value={netBillingAmmount}
              disabled="true"
              textColor="#689F38"
              activeUnderlineColor="#689F38"
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

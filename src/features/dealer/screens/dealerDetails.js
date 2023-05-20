import { StatusBar } from "expo-status-bar";
import { useContext, useState, useEffect } from "react";
import { List } from "react-native-paper";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Text } from "../../global/components/typography/text.component";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { ToastAndroid, Platform, AlertIOS } from "react-native";
import {
  TitleView,
  TopView,
  MiddleView,
  BottomView,
  ProfileSection,
  SectionEnd,
  TopConatiner,
  BottomContainer,
  DetailsView,
  AddPaymentButton,
  AddOrderButton,
  Divider,
  DividertertiarySmall,
  CustomTabView,
  MainView,
} from "../components/dealers.style";
import { Searchbar } from "react-native-paper";
import { PaymentHistoryContext } from "../../../services/paymentHistory/paymentHistory.context";

import { DealersContext } from "../../../services/dealers/dealers.context";
import PaymentHistoryInfo from "../components/paymentHistory.info";
import OrderHistoryInfo from "../components/orderHistory.info";
import AddPaymentFormOverlay from "../../payment-details/addPaymentFormOverlay";
import AddOrderFormOverlay from "../../order-details/addOrderFormOverlay";
import { OrderHistoryContext } from "../../../services/orders/orderHistory.context";
export default function DealerDetails({ navigation, route }) {
  const { dealer } = route.params;
  const navigateBack = () => {
    navigation.pop();
  };
  const {
    orderHistoryDealerSpecific,
    isOrderHistoryCallLoading,
    orderHistoryCallError,
    orderHistoryCallsucess,
    fetchOrderHistoryByDealerId
  } = useContext(OrderHistoryContext);
  const fetchOrderHistory = (id) => {
    setOrderHistoryClicked(true);
    setButttonSelected("orderHistory");
   // renderTaost();
    console.log("isOrderHistoryCallLoading is :", isOrderHistoryCallLoading);
    console.log("orderListRender flag  is :", orderListRenderFlag);
   
    if(orderHistoryDealerSpecific!=null && orderHistoryDealerSpecific.length>0 && orderHistoryDealerSpecific[0].dealerId==id){
      console.log("order history already fetched ,skipping db call ");
      console.log("Already fetched order history is",orderHistoryDealerSpecific);
    }else{
      console.log("fetching order hitory from db");
      fetchOrderHistoryByDealerId(id);
    }
    
    console.log("orderListRender flag  is :", orderListRenderFlag);
    console.log("isOrderHistoryCallLoading is :", isOrderHistoryCallLoading);
   
  };
  const renderCustomTaost = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(message);
    }
  };
  const renderTaost = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("coming soon", ToastAndroid.SHORT);
    } else {
      AlertIOS.alert("coming soon");
    }
  };
  const renderErrorToast = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(message);
    }
  };
  const {
    paymentHistoryDealerSpecific,
    isLoading,
    error,
    sucess,
    fetchPaymentHistoryByDealerId,
    AddNewPaymentHistory,
  } = useContext(PaymentHistoryContext);
  const {
    isLaodingDealer,
    errorDealer,
    successDealerDb,
    updateDelearDueAmountById,
  } = useContext(DealersContext);
  const [ButttonSelected, setButttonSelected] = useState("");
  const [dealerPaymentHistory, setDealerPaymentHistory] = useState([]);
  const [paymentHistoryClicked, setPaymentHistoryClicked] = useState(false);
  const [orderHistoryClicked, setOrderHistoryClicked] = useState(false);
  const [AddPaymentOverlayOpened, setAddPaymentOverlayOpened] = useState(false);
  const [AddOrderOverlayOpened, setAddOrderOverlayOpened] = useState(false);
  useEffect(() => {
  
    fetchPaymentHistoryByDealerId(dealer.dealerId);
    console.log("dealer detail loaded, fetch payment called");
  }, []);
  const fetchPaymentHistory = (id) => {
    setPaymentHistoryClicked(true);
    setButttonSelected("paymentHistory");
      console.log("isloading is :", isLoading);
      console.log("paymentListRender flag  is :", paymentListRenderFlag);
      if(paymentHistoryDealerSpecific!=null && paymentHistoryDealerSpecific.length>0 && paymentHistoryDealerSpecific[0].dealerId==id){
        console.log("payment history already fetched ,skipping db call ");
        console.log("Already fetched payment history is",paymentHistoryDealerSpecific);
      }else{
        console.log("fetching order history from db");
        fetchPaymentHistoryByDealerId(id);
      }
      console.log("paymentListRender flag  is :", paymentListRenderFlag);
      console.log("isloading is :", isLoading);
    
   
  };
  const submitNewPayment = (paymentHistory) => {
    console.log("inside submitNewPayment");
    //fetchPaymentHistoryByDealerId(dealer.dealerId);
    AddNewPaymentHistory(paymentHistory)
    .then(() => {
      console.log("payment add sucess");
    togglePaymentOverlay();
    renderCustomTaost("payment added sucessfully");
    console.log("payment history after additing payment is", paymentHistory);
    if (paymentHistoryDealerSpecific != null && paymentHistoryDealerSpecific.length > 0) {
      console.log("finalizing last payment date");
      if(paymentHistoryDealerSpecific[0].paymentDateTimestamp>paymentHistory.paymentDateTimestamp){
        dealer.lastPaymentDate = paymentHistoryDealerSpecific[0].paymentDate;
      }else{
        dealer.lastPaymentDate = paymentHistory.paymentDate;
      }
    }else{
      dealer.lastPaymentDate = paymentHistory.paymentDate;
    }
    console.log("last payment date is ", dealer.lastPaymentDate);
    updateDelearDueAmountById(dealer);
    console.log("dealer info uploaded after payment add");
    console.log("is loading is " + isLoading);
    fetchPaymentHistoryByDealerId(dealer.dealerId);
    })
    .catch((e) => {
      console.log("ERROR WHILE ADDING PAYMENT- "+e);
      if(e.toString().includes("permission-denied")){
        renderErrorToast("Permisson denied");
      }else{
        renderErrorToast("ERROR WHILE ADDING PAYMENT- "+e);
      }
      
    });
    

  };
  const submitNewPaymentPrev = (paymentHistory) => {
    console.log("inside submitNewPayment");
    fetchPaymentHistoryByDealerId(dealer.dealerId);
    console.log("sucess was", sucess);
    AddNewPaymentHistory(paymentHistory);
    console.log("sucess is ", sucess);
    if (sucess) {
      console.log("payment add sucess");
      togglePaymentOverlay();
      fetchPaymentHistoryByDealerId(dealer.dealerId);
      console.log("payment history after additing payment is", paymentHistory);
      if (paymentHistory != null && paymentHistory.length > 0) {
        console.log("inside if block");
        dealer.lastPaymentDate = paymentHistory[0].paymentDate;
        console.log("last payment date is ", dealer.lastPaymentDate);
      }
      dealer.lastPaymentDate = paymentHistory.paymentDate;
      updateDelearDueAmountById(dealer);
      console.log("dealer info uploaded after payment add");
      console.log("is loading is " + isLoading);
    }
    if (error) {
      console.log("payment add failed withh error", error);
    }
  };
  const togglePaymentOverlay = () => {
    console.log("inside togle method");
    console.log(
      "deleare details re-rendered, payment list flag is :" +
      paymentListRenderFlag +
      "Button selected is :" +
      ButttonSelected
    );
    setAddPaymentOverlayOpened(!AddPaymentOverlayOpened);
  };
  const toggleOrderOverlay = () => {
    console.log("inside togle order overlay method");
    console.log(
      "deleare details re-rendered, paymentlist flag is :" +
      paymentListRenderFlag +
      "Button selected is :" +
      ButttonSelected
    );
    setAddOrderOverlayOpened(!AddOrderOverlayOpened);
  };
  const paymentListRenderFlag = ButttonSelected === "paymentHistory" && !isLoading;
  const orderListRenderFlag = ButttonSelected === "orderHistory" && !isOrderHistoryCallLoading;
  const LoadingIndicatorRenderFlag = isLoading || isOrderHistoryCallLoading;
  return (
    <MainView>
      <DividertertiarySmall />
      <TitleView>
        <Text variant="title_white">{dealer.buisnessName.toUpperCase()}</Text>
      </TitleView>
      <TopView>
        <Ionicons name="ios-person-circle" size={92} color="#689F38" />
        <DetailsView>
          <Text variant="title" adjustsFontSizeToFit numberOfLines={1}>
            {dealer.name.toUpperCase()}
          </Text>
          <Text variant="labelSmall" adjustsFontSizeToFit numberOfLines={1}>
            Mobile No: {dealer.mobleNumer}
          </Text>
          <Text variant="labelSmall" adjustsFontSizeToFit numberOfLines={1}>
            {dealer.address}
          </Text>
          <Text variant="labelSmall" adjustsFontSizeToFit numberOfLines={1}>
            Dealer Id : {dealer.dealerId}
          </Text>
          <Text variant="title" adjustsFontSizeToFit numberOfLines={1}>
            Amount Due:{"       "}
            {dealer.dueAmount}
          </Text>
        </DetailsView>
      </TopView>
      <Divider />
      <MiddleView>
        <AddPaymentButton onPress={togglePaymentOverlay}>
          <FontAwesome5 name="rupee-sign" size={24} color="#DCEDC8" />
          {/* <Text variant="caption" adjustsFontSizeToFit numberOfLines={1}>
            Payment
          </Text> */}
        </AddPaymentButton>

        <AddOrderButton onPress={toggleOrderOverlay}>
          <MaterialCommunityIcons
            name="truck-delivery"
            size={30}
            color="#DCEDC8"
          />
          {/* <Text variant="caption" adjustsFontSizeToFit numberOfLines={1}>
            Add Order
          </Text> */}
        </AddOrderButton>
      </MiddleView>
      <Divider />
      <CustomTabView>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => fetchPaymentHistory(dealer.dealerId)}
        >
          {ButttonSelected === "paymentHistory" ? (
            <View
              style={{
                flex: 1,
                height: 40,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#DCEDC8",
                paddingHorizontal: 4,
                marginEnd: 1,
              }}
            >
              <Text variant="body">Payment History</Text>
              {/* <AntDesign name="down" size={20} color="white" /> */}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                height: 40,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#689F38",
                paddingHorizontal: 4,
                marginEnd: 1,
              }}
            >
              <Text variant="bodyWhite">Payment History</Text>
              {/* <AntDesign name="down" size={20} color="white" /> */}
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={()=>fetchOrderHistory(dealer.dealerId)}>
          {ButttonSelected === "orderHistory" ? (
            <View
              style={{
                flex: 1,
                height: 40,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#DCEDC8",
                marginStart: 1,
                paddingHorizontal: 4,
              }}
            >
              <Text variant="body">Order History</Text>
              {/* <AntDesign name="down" size={20} color="white" /> */}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                height: 40,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#689F38",
                marginStart: 1,
                paddingHorizontal: 4,
              }}
            >
              <Text variant="bodyWhite">Order History</Text>
              {/* <AntDesign name="down" size={20} color="white" /> */}
            </View>
          )}
        </TouchableOpacity>
      </CustomTabView>

      {paymentListRenderFlag ? (
        <>
          <DividertertiarySmall />

          <ScrollView>
            {paymentHistoryDealerSpecific.map((item) => {
              return <PaymentHistoryInfo paymentDetails={item} key={item.paymentDateTimestampString}/>;
            })}
          </ScrollView>
        </>
      ) : (
        // <FlatList
        //   data={paymentHistory}
        //   renderItem={({ item }) => {
        //     console.log(
        //       "payment date is",
        //       new Date(item.paymentDateTimestamp.seconds * 1000)
        //     );
        //     return <PaymentHistoryInfo paymentDetails={item} />;
        //   }}
        //   keyExtractor={(item) => item.pmtId}
        // />
        LoadingIndicatorRenderFlag && (
          <ActivityIndicator
            style={{ marginTop: 8 }}
            size="large"
            color="#138000"
          />
        )
      )}

  {orderListRenderFlag ? (
        <>
          <DividertertiarySmall />

          <ScrollView>
            {orderHistoryDealerSpecific.map((item) => {
              return <OrderHistoryInfo orderDetails={item} key={item.orderDateTimestampString} />;
            })}
          </ScrollView>
        </>
      ) : (
        // <FlatList
        //   data={paymentHistory}
        //   renderItem={({ item }) => {
        //     console.log(
        //       "payment date is",
        //       new Date(item.paymentDateTimestamp.seconds * 1000)
        //     );
        //     return <PaymentHistoryInfo paymentDetails={item} />;
        //   }}
        //   keyExtractor={(item) => item.pmtId}
        // />
        // LoadingIndicatorRenderFlag && (
        //   <ActivityIndicator
        //     style={{ marginTop: 8 }}
        //     size="large"
        //     color="#138000"
        //   />
        // )
        null
      )}



      {AddPaymentOverlayOpened && (
        <AddPaymentFormOverlay
          togglePaymentOverlay={togglePaymentOverlay}
          dealer={dealer}
          submitNewPayment={submitNewPayment}
        />
      )}
      {AddOrderOverlayOpened && (
        <AddOrderFormOverlay
          toggleOrderOverlay={toggleOrderOverlay}
          dealer={dealer}
        />
      )}
    </MainView>
  );
}

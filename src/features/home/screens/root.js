import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { BackgroundImage } from "../../authentication/screens/welcome.style";
import { useContext } from "react";
import { Searchbar } from "react-native-paper";
import { DealersContext } from "../../../services/dealers/dealers.context";
import { PaymentHistoryContext } from "../../../services/paymentHistory/paymentHistory.context";
import { OrderHistoryContext } from "../../../services/orders/orderHistory.context";
export default function Root({ navigation }) {
  const { dealers, isLoading, error, fetchDealers } =
    useContext(DealersContext);
    const {fetchPaymentHistory } =
    useContext(PaymentHistoryContext);
    const {fetchOrderHistory} =
    useContext(OrderHistoryContext);
  const navigateToDealerPage = () => {
    //fetchDealers();
    navigation.navigate("Dealers");
  };

  const navigateToPaymentHistoryPage = () => {
    //fetchPaymentHistory();
    navigation.navigate("Payments");
  };

  const navigateToOrderHistoryPage = () => {
    //fetchOrderHistory();
    navigation.navigate("Orders");
  };
  
  return (
    <BackgroundImage>
      <View style={styles.homeContainer}>
        {/* <View style={styles.headerStyle}>
          <Text style={styles.headerTitleText}>Home</Text>
        </View>
        <View style={styles.divider} /> */}
        {/* <Searchbar placeholder="Search" style={{ marginTop: 20 }} /> */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../../assets/yash_raj_sales_app_logo.png")}
          />
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.topButtonContainer}>
            <TouchableOpacity style={styles.topButton1} onPress={navigateToPaymentHistoryPage}>
              <Image
                source={require("../../../../assets/paymentHistoryIcon-removebg-preview.png")}
                style={styles.imagePaymentHistory}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.topButton2} onPress={navigateToOrderHistoryPage}>
              <Image
                source={require("../../../../assets/orderHistoryIcon-removebg-preview.png")}
                style={styles.imagePaymentHistory}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.bottomButton}
              Text="Dealers"
              onPress={navigateToDealerPage}
            >
                <Image
                  source={require("../../../../assets/dealersIcon-removebg-preview.png")}
                  style={styles.imageDealers}
                />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  homeContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
    opacity: 0.9,
  },
  headerStyle: {
    height: 80,
    backgroundColor: "#795548",
    alignItems: "center",
    paddingBottom: 10,
    justifyContent: "flex-end",
  },
  headerTitleText: {
    color: "#fff",
    fontWeight: "normal",
    fontSize: 18,
    fontFamily: "sans-serif-medium",
  },
  divider: {
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  buttonContainer: {
    height: "50%",
    marginTop: 20,
  },
  topButtonContainer: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
  },
  bottomButtonContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  topButton1: {
    flex: 1,

    borderRadius: 4,
    marginEnd: 5,
    marginStart: 5,
    backgroundColor: "#689F38",
  },
  topButton2: {
    flex: 1,
    borderRadius: 4,
    marginStart: 5,
    marginEnd: 5,
    backgroundColor: "#689F38",
  },
  bottomButton: {
    flex: 1,
    borderRadius: 4,
    marginStart: 5,
    marginEnd: 5,
    backgroundColor: "#689F38",
  },
  footer: {
    flex: 0.25,
    padding: 20,
    backgroundColor: "blue",
  },
  imagePaymentHistory: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  imageDealers: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

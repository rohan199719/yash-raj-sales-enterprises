import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import Home from "./src/features/home/screens/home";
import { NavigationContainer } from "@react-navigation/native";

import Welcome from "./src/features/authentication/screens/welcome";
import Login from "./src/features/authentication/screens/login";
import { Navigator } from "./src/infrastructure/navigation/index";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { DealerContextProvider } from "./src/services/dealers/dealers.context";
import { OrderHistoryContextProvider } from "./src/services/orders/orderHistory.context";
import { PaymentHistoryContextProvider } from "./src/services/paymentHistory/paymentHistory.context";
import { ThemeProvider } from "styled-components/native";
import { initializeApp } from "firebase/app";
import { theme } from "./src/infrastructure/theme";
const firebaseConfig = {
  apiKey: "AIzaSyDC0Ri1RUBXKwRu02RCWYlQpmb2Pih3tR8",
  authDomain: "yash-raj-sales-enterprises-dev.firebaseapp.com",
  projectId: "yash-raj-sales-enterprises-dev",
  storageBucket: "yash-raj-sales-enterprises-dev.appspot.com",
  messagingSenderId: "160330531453",
  appId: "1:160330531453:web:bcd104b712a822d46e6714",
};

const app = initializeApp(firebaseConfig);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthenticationContextProvider>
        <PaymentHistoryContextProvider>
          <OrderHistoryContextProvider>
            <DealerContextProvider>
              <Navigator />
            </DealerContextProvider>
          </OrderHistoryContextProvider>
        </PaymentHistoryContextProvider>
      </AuthenticationContextProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

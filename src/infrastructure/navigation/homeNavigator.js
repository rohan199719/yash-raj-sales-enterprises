import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Text, View } from "react-native";
import Dealers from "../../features/dealer/screens/dealers";
import Payments from "../../features/dealer/screens/payments";
import Orders from "../../features/dealer/screens/orders";
import DealerDetails from "../../features/dealer/screens/dealerDetails";
import Root from "../../features/home/screens/root";
const Stack = createStackNavigator();

const DealerScreen = () => {
  return (
    <View>
      <Text>DealerScreen</Text>
    </View>
  );
};
const DealerDetailsScreen = () => {
  return (
    <View>
      <Text>DealerDetailsScreen</Text>
    </View>
  );
};

export const HomeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Root"
      component={Root}
      options={{
        title: "YASH RAJ SALES ENTERPRISES",
        headerStyle: {
          backgroundColor: "#689F38",
        },
        headerTintColor: "#DCEDC8",
        headerTitleStyle: {
          justifyContent: "center",
        },
      }}
    />
    <Stack.Screen
      name="Dealers"
      component={Dealers}
      options={{
        title: "DEALERS",
        headerStyle: {
          backgroundColor: "#689F38",
        },
        headerTintColor: "#DCEDC8",
        headerTitleStyle: {
          justifyContent: "center",
        },
      }}
    />
    <Stack.Screen
      name="DealerDetails"
      component={DealerDetails}
      options={{
        title: "DEALER DETAILS",
        headerStyle: {
          backgroundColor: "#689F38",
        },
        headerTintColor: "#DCEDC8",
        headerTitleStyle: {
          justifyContent: "center",
        },
      }}
    />
 <Stack.Screen
      name="Payments"
      component={Payments}
      options={{
        title: "Payment History",
        headerStyle: {
          backgroundColor: "#689F38",
        },
        headerTintColor: "#DCEDC8",
        headerTitleStyle: {
          justifyContent: "center",
        },
      }}
    />
 <Stack.Screen
      name="Orders"
      component={Orders}
      options={{
        title: "Orders History",
        headerStyle: {
          backgroundColor: "#689F38",
        },
        headerTintColor: "#DCEDC8",
        headerTitleStyle: {
          justifyContent: "center",
        },
      }}
    />
  </Stack.Navigator>
);

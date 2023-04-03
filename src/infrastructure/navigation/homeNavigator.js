import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Text, View } from "react-native";
import Dealers from "../../features/dealer/screens/dealers";
import DealerDetails from "../../features/dealer/screens/dealerDetails";
import Home from "../../features/home/screens/home";
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
      name="Home"
      component={Home}
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
  </Stack.Navigator>
);

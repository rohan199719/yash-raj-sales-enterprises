import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect,useContext } from "react";
import { Text, View } from "react-native";
import Menu from "../../features/menu/screens/menu";

const Stack = createStackNavigator();



export const MenuNavigator = () => {
  return(
  <Stack.Navigator>
    <Stack.Screen
      name="MenuScreen"
      component={Menu}
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
  </Stack.Navigator>
);
    };

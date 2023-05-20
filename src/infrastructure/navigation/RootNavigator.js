import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Welcome from "../../features/authentication/screens/welcome";
import Login from "../../features/authentication/screens/login";
import { useEffect,useContext } from "react";
import { AppNavigator } from "./appNavigator";
import { AccountNavigator } from "./accountNavigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { AppRenderNavigator } from "./AppRenderNavigator";
const RootStack = createStackNavigator();


export const RootNavigator = () => {
  return (
  <RootStack.Navigator
    screenOptions={{ headerShown: false, presentation: "modal" }}
  >
    <RootStack.Screen name="AppRenderNavigator" component={AppRenderNavigator} />

  </RootStack.Navigator>);
};

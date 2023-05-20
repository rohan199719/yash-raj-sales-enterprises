import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Welcome from "../../features/authentication/screens/welcome";
import Login from "../../features/authentication/screens/login";
import { useEffect } from "react";

const Stack = createStackNavigator();


export const AccountNavigator = () => {
  useEffect(() => {
   
    console.log("account navigation page loaded");
  }, []);
  return (
  <Stack.Navigator
    screenOptions={{ headerShown: false, presentation: "modal" }}
  >
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>);
};

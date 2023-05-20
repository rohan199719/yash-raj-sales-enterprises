import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect,useContext } from "react";
import { AppNavigator } from "./appNavigator";
import { AccountNavigator } from "./accountNavigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

const Stack = createStackNavigator();


export const AppRenderNavigator = ({ navigation }) => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  useEffect(() => {
    console.log("AppRenderNavigator navigation page loaded auth is "+isAuthenticated);
   if(isAuthenticated){
    navigation.replace("AppNavigator");
   }else{
    navigation.replace("AccountNavigator");
   }
  }, []);
  return (
  <Stack.Navigator
    screenOptions={{ headerShown: false, presentation: "modal" }}
  >
     <Stack.Screen name="AppNavigator" component={AppNavigator} />
    <Stack.Screen name="AccountNavigator" component={AccountNavigator} />
  </Stack.Navigator>);
};

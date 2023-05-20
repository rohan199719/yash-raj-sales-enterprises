import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { HomeNavigator } from "./homeNavigator";
import { MenuNavigator } from "./menuNavigator";
import { SettingNavigator } from "./settingNavigator";
import Setting from "../../features/settings/screens/setting";
import { useEffect } from "react";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home-sharp",
  Menu: "md-menu",
  Settings: "md-settings",
};
const SettingScreen = () => {
  return <View></View>;
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    headerShown: false,
  };
};



export const AppNavigator = () => {
  useEffect(() => {
   
    console.log("app navigation page loaded");
  }, []);
  return (
  <Tab.Navigator
    headerMode="none"
    screenOptions={createScreenOptions}
    tabBarOptions={{
      activeTintColor: "#689F38",
      inactiveTintColor: "#DCEDC8",
      activeBackgroundColor: "#DCEDC8",
      inactiveBackgroundColor: "#689F38",
      tabBarStyle: {
        borderTopWidth: 4,
        borderColor: "",
      },
    }}
  >
    <Tab.Screen name="Home" component={HomeNavigator} />
    {/* <Tab.Screen name="Menu" component={MenuNavigator} /> */}
    <Tab.Screen name="Settings" component={SettingNavigator} />
  </Tab.Navigator>
);
  }
import { createStackNavigator } from "@react-navigation/stack";
import Setting from "../../features/settings/screens/setting";

const Stack = createStackNavigator();



export const SettingNavigator = () => {
  return(
  <Stack.Navigator>
    <Stack.Screen
      name="SettingScreen"
      component={Setting}
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

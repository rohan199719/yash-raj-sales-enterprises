import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AppNavigator } from "./appNavigator";
import { AccountNavigator } from "./accountNavigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const Navigator = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  console.log("reloaded ,isAsuth is", isAuthenticated);
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

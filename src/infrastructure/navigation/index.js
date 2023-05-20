import { NavigationContainer } from "@react-navigation/native";
import { useContext,useEffect } from "react";
import { AppNavigator } from "./appNavigator";
import { AccountNavigator } from "./accountNavigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { RootNavigator } from "./RootNavigator";

export const Navigator = () => {

  useEffect(() => {
   
    console.log("main index loaded , is auth flag is :"+isAuthenticated);
  }, []);

  const { isAuthenticated } = useContext(AuthenticationContext);
  return (
    <NavigationContainer>
     {/* <RootNavigator/> */}
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

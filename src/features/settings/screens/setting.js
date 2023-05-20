import {
  SubmitButton,
  SubmitButtonText,
  LogoutButtonContainer,
} from "./setting.style";
import { BackgroundImage,BackgroundScreenOpacityLayer } from "../../authentication/screens/login.style";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { ToastAndroid, Platform, AlertIOS } from "react-native";
//import { AccountNavigator } from "../../../infrastructure/navigation/accountNavigator";

export default function Setting({ navigation }) {
  const { isAuthenticated ,setUser,setError,setIsLoading} = useContext(AuthenticationContext);
  const { onLogout } = useContext(AuthenticationContext);
  const renderCustomTaost = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(message);
    }
  };
  const handleLogout = async () =>{
   await onLogout()
   .then(() => {
    setUser(null);
    setError(null);
    setIsLoading(false);
    //navigation.replace("AccountNavigator");
    console.log("log out success");
    renderCustomTaost("you are logged out") ;
  });
   
   }

  return (
    
      <BackgroundImage><BackgroundScreenOpacityLayer>
        <LogoutButtonContainer>
      <SubmitButton onPress={()=>handleLogout()}>
        <SubmitButtonText>Logout</SubmitButtonText>
      </SubmitButton>
      </LogoutButtonContainer>
      </BackgroundScreenOpacityLayer></BackgroundImage>
 
  );
}

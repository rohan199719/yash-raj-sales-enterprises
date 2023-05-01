import {
  SubmitButton,
  SubmitButtonText,
  LogoutButtonContainer,
} from "./setting.style";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { ToastAndroid, Platform, AlertIOS } from "react-native";
export default function Setting({ navigation }) {
  const { onLogout } = useContext(AuthenticationContext);
  const renderCustomTaost = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(message);
    }
  };
  const handleLogout = async () =>{
   await onLogout();
   renderCustomTaost("you are logged out") ;
   }

  return (
    <LogoutButtonContainer>
      <SubmitButton onPress={()=>handleLogout()}>
        <SubmitButtonText>Logout</SubmitButtonText>
      </SubmitButton>
    </LogoutButtonContainer>
  );
}

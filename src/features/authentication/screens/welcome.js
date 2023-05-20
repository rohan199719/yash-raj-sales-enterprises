import {
  ScreenContainer,
  BackgroundImage,
  BackgroundScreenOpacityLayer,
  LogoContainer,
  Logo,
  ButtonContainer,
  Button,
  ButtonText,
} from "./welcome.style";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { useEffect,useContext } from "react";
import { ToastAndroid, Platform, AlertIOS } from "react-native";
export default function Welcome({ navigation }) {
  const { isAuthenticated } = useContext(AuthenticationContext);
  const renderTaost = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("coming soon", ToastAndroid.SHORT);
    } else {
      AlertIOS.alert("coming soon");
    }
  };

  return (
    <ScreenContainer>
      <BackgroundImage>
        <BackgroundScreenOpacityLayer>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <ButtonContainer>
            <Button onPress={() => navigation.navigate("Login")}>
              <ButtonText>Login</ButtonText>
            </Button>
            <Button onPress={renderTaost}>
              <ButtonText>Apply For Sale Person</ButtonText>
            </Button>
          </ButtonContainer>
        </BackgroundScreenOpacityLayer>
      </BackgroundImage>
    </ScreenContainer>
  );
}

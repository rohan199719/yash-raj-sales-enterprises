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

import { ToastAndroid, Platform, AlertIOS } from "react-native";
export default function Welcome({ navigation }) {
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

import { useContext, useState } from "react";
import { ScrollView, Text, ActivityIndicator } from "react-native";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {
  LoginScreenContainer,
  BackgroundImage,
  BackgroundScreenOpacityLayer,
  LogoContainer,
  Logo,
  LoginFormContainer,
  UserInputContainer,
  EmailInput,
  PasswordInput,
  SubmitButtonContainer,
  SubmitButton,
  SubmitButtonText,
  ErrorContainer,
} from "./login.style";
import { Overlay } from "react-native-elements";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect } from "react";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ActivityIndicatorEnable, setActivityIndicatorEnable] = useState(false);

  const { onLogin, isLoading, error } = useContext(AuthenticationContext);

  const handleLogin = async (email, password) => {
    setActivityIndicatorEnable(true);
    await onLogin(email, password);
    setActivityIndicatorEnable(false);
  };
  useEffect(() => {

    console.log(
      "welcome page  relaoded"
    );
  }, [isLoading]);
  return (
    <LoginScreenContainer>
      <BackgroundImage>
        <BackgroundScreenOpacityLayer>
          <ScrollView>
            <LogoContainer>
              <Logo />
            </LogoContainer>
            <LoginFormContainer>
              <UserInputContainer>
                <EmailInput
                  placeholder="Email id"
                  value={email}
                  onChangeText={(txt) => setEmail(txt)}
                />
                <PasswordInput
                  placeholder="Password"
                  value={password}
                  textContentType="password"
                  secureTextEntry
                  onChangeText={(txt) => setPassword(txt)}
                />
              </UserInputContainer>
              {error && (
                <ErrorContainer size="large">
                  <Text variant="error">{error}</Text>
                </ErrorContainer>
              )}
              <SubmitButtonContainer>
                {
                  !ActivityIndicatorEnable && (
                    <SubmitButton onPress={() => handleLogin(email, password)}>
                      {!isLoading ? <SubmitButtonText>Submit</SubmitButtonText> : <SubmitButtonText>Loading..</SubmitButtonText>}
                    </SubmitButton>
                  )}
              </SubmitButtonContainer>
            </LoginFormContainer>
          </ScrollView>
        </BackgroundScreenOpacityLayer>
      </BackgroundImage>
    </LoginScreenContainer>

  );
}

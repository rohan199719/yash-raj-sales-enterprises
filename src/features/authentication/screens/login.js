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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { onLogin, isLoading, error } = useContext(AuthenticationContext);
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
                {isLoading ? (
                  <SubmitButton disabled="true">
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  </SubmitButton>
                ) : (
                  <SubmitButton onPress={() => onLogin(email, password)}>
                    <SubmitButtonText>Submit</SubmitButtonText>
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

import { useContext, useState } from "react";
import { ScrollView, Text, ActivityIndicator, ToastAndroid,
  Platform,
  AlertIOS, } from "react-native";
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
import ActivityIndicatorOverlay from "../../home/screens/ActivityIndicatorOverlay";
//import { AppNavigator } from "../../../infrastructure/navigation/appNavigator";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ActivityIndicatorEnable, setActivityIndicatorEnable] = useState(false);
  const { isAuthenticated } = useContext(AuthenticationContext);
  const { onLogin,setUser,setIsLoading, setError,isLoginCallProgress, error ,setIsLoginCallProgress} = useContext(AuthenticationContext);
  const renderTaost = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(message);
    }
  };
  const handleLogin = async (email, password) => {
    await onLogin(email, password)
    .then((u) => {
      setUser(u);
      setIsLoading(false);
      //navigation.replace("AppNavigator");
      console.log("login success");
    })
    .catch((e) => {
      setIsLoading(false);
      console.log("error is: ",e.message);
      const errorArray = e.message.split("auth/");
      console.log("error is: ",errorArray);
      if(errorArray.length>0){
        setError(errorArray[1]);
      }else{
        setError(e.message);
      }
      if(e.toString().includes("wrong-password")){
        renderTaost("Incorrect Password");
      }else if(e.toString().includes("invalid-email")){
        renderTaost("Incorrect email adress");
      }else if(e.toString().includes("user-not-found")){
        renderTaost("user not exist");
      }
      setIsLoading(false); 
    }).finally(() => {
      setIsLoginCallProgress(false);
    });

  };
  useEffect(() => {

    console.log(
      "login page  reloaded"
    );
  }, []);
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
              {/* {error && (
                <ErrorContainer size="large">
                  <Text variant="error">{error}</Text>
                </ErrorContainer>
              )} */}
              <SubmitButtonContainer>
                {
                  (
                    <SubmitButton onPress={() => handleLogin(email, password)} disabled={isLoginCallProgress}>
                      {!isLoginCallProgress ? <SubmitButtonText>Submit</SubmitButtonText> : <ActivityIndicator size="large" color="#FFFFFF" style={{position:"absolute",right:'50%',left:'50%',top:'50%',bottom:'50%'}}/>}
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

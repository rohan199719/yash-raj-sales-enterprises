import {
  SubmitButton,
  SubmitButtonText,
  LogoutButtonContainer,
} from "./setting.style";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export default function Setting() {
  const { onLogout } = useContext(AuthenticationContext);
  return (
    <LogoutButtonContainer>
      <SubmitButton onPress={() => onLogout()}>
        <SubmitButtonText>Logout</SubmitButtonText>
      </SubmitButton>
    </LogoutButtonContainer>
  );
}

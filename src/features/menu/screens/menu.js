
  import { BackgroundImage, BackgroundScreenOpacityLayer} from "../../authentication/screens/welcome.style";
  import { Ionicons } from "@expo/vector-icons";
  import { useContext } from "react";
  import { View, Text, ActivityIndicator } from "react-native";
  import { ToastAndroid, Platform, AlertIOS } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
  
export default function Menu({ navigation }) {
    const renderCustomTaost = (message) => {
      if (Platform.OS === "android") {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
        AlertIOS.alert(message);
      }
    };
    
     
     
  
    return (
      
        <BackgroundImage><BackgroundScreenOpacityLayer>
          <View>
        <TouchableOpacity>
          <Text>Export Payment history</Text>
        </TouchableOpacity>
        </View>
        </BackgroundScreenOpacityLayer></BackgroundImage>
   
    );
  }
  
import { StatusBar } from "expo-status-bar";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { Overlay } from "react-native-elements";
import { DataTable } from "react-native-paper";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import { Text } from "../../global/components/typography/text.component";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  AntDesign,
  Fontisto,
} from "@expo/vector-icons";


export default function ActivityIndicatorOverlay() {
  const [name, setName] = useState("");
 


  return (
    <Overlay>
       <ActivityIndicator size="large" color="#689F38" style={{position:"absolute",right:'50%',left:'50%',top:'50%',bottom:'50%'}}/>
    </Overlay>
  );
}

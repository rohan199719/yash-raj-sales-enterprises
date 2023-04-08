import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import DealerList from "../components/dealers.style";
import DealerInfoCard from "../components/dealer.info.card";
import { Searchbar } from "react-native-paper";
import { DealersContext } from "../../../services/dealers/dealers.context";
import { FlatList } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import AddDealerFormOverlay from "../components/addDealerFormOverlay";


export default function Dealers({ navigation }) {

  const [addDealerOverlayOpenFlag, setAddDealerOverlayOpenFlag] = useState(false);

  const navigateBack = () => {
    navigation.navigate("Home");
  };
  const GoToDealerDtails = (dealer) => {
    navigation.navigate("DealerDetails", (dealer = { dealer }));
  };

  const toggleAddDealerOverlay = () => {
    setAddDealerOverlayOpenFlag(!addDealerOverlayOpenFlag);
  };

  const { dealers, isLaoding, error, fetchDealers } =
    useContext(DealersContext);
  return (
    <View>
      <FlatList
        data={dealers}
        renderItem={({ item }) => {
          console.log("in render item", item);
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("DealerDetails", { dealer: item });
              }}
            >
              <DealerInfoCard dealer={item} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.dealerId}
      />

      <TouchableOpacity
style={{

  // borderWidth: 4,
  // alignItems: 'center',
  // justifyContent: 'center',
  // width: 62,
  // position: 'absolute',
  // bottom: 40,
  // right: 10,
  // height: 62,
  // borderRadius: 31,
  // borderColor: "#388E3C"
  height: 60,
  width: 60,
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 30,
  backgroundColor: "#4C4B16",
   bottom: 38,
  right: 12,
  elevation: 16,
  borderWidth: 3,
  borderColor: "#DCEDC8"

}}
        onPress={toggleAddDealerOverlay}
      >
        <MaterialCommunityIcons name="account-plus" size={30} color="#DCEDC8" />
      </TouchableOpacity>

      {addDealerOverlayOpenFlag && (
        <AddDealerFormOverlay
          toggleAddDealerOverlay={toggleAddDealerOverlay}
        />
      )}
    </View>
  );
}

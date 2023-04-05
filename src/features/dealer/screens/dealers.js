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
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";


export default function Dealers({ navigation }) {
  const navigateBack = () => {
    navigation.navigate("Home");
  };
  const GoToDealerDtails = (dealer) => {
    navigation.navigate("DealerDetails", (dealer = { dealer }));
  };

  const togleAddDealerOverlay = () => {
   
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


          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          bottom: 40,
          right: 10,
          height: 70,
          borderRadius: 100,
        }}
        onPress={togleAddDealerOverlay}
      >
        <AntDesign name="pluscircle" size={64} color="#689F38" />
      </TouchableOpacity>
    </View>
  );
}

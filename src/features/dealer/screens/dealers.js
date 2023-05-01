import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator
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
  const [searchQuery, setSearchQuery] =useState('');
  const [filteredDealer, setFilteredDealer] =useState(dealers);

  const navigateBack = () => {
    navigation.navigate("Home");
  };
  const GoToDealerDtails = (dealer) => {
    navigation.navigate("DealerDetails", (dealer = { dealer }));
  };

  const toggleAddDealerOverlay = () => {
    setAddDealerOverlayOpenFlag(!addDealerOverlayOpenFlag);
  };
  useEffect(() => {
    console.log("deleare relaoded");
    fetchDealers();
    console.log("fetch dealer called");
    setFilteredDealer(dealers);
    console.log("filtered dealer set to default dealers");
   
  }, []);
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    var filterDealer = dealers.filter(dealer => dealer.name.toLowerCase().includes(query.toLowerCase()));
    
    setFilteredDealer(filterDealer);
  }
  const { dealers, isLoading, error, fetchDealers } =
    useContext(DealersContext);
  return (isLoading? <ActivityIndicator size="large" color="#689F38" style={{position:"absolute",right:'50%',left:'50%',top:'50%',bottom:'50%'}}/> :
    <View>
      <Searchbar  placeholder="Search Dealers"
      placeholderTextColor={"#757575"}
      onChangeText={onChangeSearch}
      style={{backgroundColor:"#DCEDC8",margin:5}}
      value={searchQuery}></Searchbar>
      <FlatList
        data={filteredDealer==null?dealers:filteredDealer}
        renderItem={({ item }) => {
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
   bottom: 72,
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

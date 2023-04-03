import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { DataTable } from "react-native-paper";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  AntDesign,
  Fontisto,
} from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text } from "../global/components/typography/text.component";
export default function AddedItemTable({ product = {}, deleteAddedProduct }) {
  const Title = styled(View)`
    flex-direction: row;
    background-color: #dcedc8;
  `;

  const deleteItem = (key) => {
    console.log("inside delete item with key" + key);
    product.splice(key, 1);
    productSetter(product);
  };

  return (
    product.length > 0 && (
      <DataTable>
        <DataTable.Header
          style={{
            backgroundColor: "#DCEDC8",
            justifyContent: "space-evenly",
          }}
        >
          <DataTable.Title style={{ flex: 3 }}> Product Name</DataTable.Title>
          <DataTable.Title style={{ flex: 3 }}>Units</DataTable.Title>
          <DataTable.Title style={{ flex: 1.5 }}>Net Price</DataTable.Title>
          <DataTable.Cell style={{ flex: 0.6 }}></DataTable.Cell>
        </DataTable.Header>
        {product.map((item) => {
          return (
            <DataTable.Row
              style={{
                justifyContent: "space-evenly",
              }}
            >
              <DataTable.Cell style={{ flex: 3 }}>
                <Text variant="caption" adjustsFontSizeToFit numberOfLines={1}>
                  {item.productName}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 3 }}>
                <Text variant="caption" adjustsFontSizeToFit numberOfLines={1}>
                  {item.units} {item.unitName}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 1.5 }}>
                <Text variant="caption" adjustsFontSizeToFit numberOfLines={1}>
                  {item.netPrice}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={() => deleteAddedProduct(item.key)}>
                  <MaterialIcons name="delete" size={20} color="green" />
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    )

    // <View
    //   style={{
    //     backgroundColor: "#DCEDC8",
    //     justifyContent: "space-evenly",
    //     width: 300,
    //     height: 50,
    //   }}
    // >
    //   <Title>
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         backgroundColor: "#DCEDC8",
    //         justifyContent: "space-evenly",
    //         width: 300,
    //         height: 50,
    //       }}
    //     >
    //       <View>
    //         <Text variant="caption">PRODUCT NAME</Text>
    //       </View>

    //       <View>
    //         <Text variant="body">UNITS</Text>
    //       </View>

    //       <View>
    //         <Text variant="body">NET PRICE</Text>
    //       </View>
    //     </View>
    //   </Title>
    //   <View
    //     style={{
    //       flexDirection: "row",
    //       backgroundColor: "#DCEDC8",
    //       justifyContent: "space-evenly",
    //       width: 300,
    //       height: 50,
    //     }}
    //   >
    //     <View>
    //       <Text variant="body">{product.productName}</Text>
    //     </View>

    //     <View>
    //       <Text variant="body">{product.units}</Text>
    //     </View>

    //     <View>
    //       <Text variant="body">{product.netPrice}</Text>
    //     </View>
    //   </View>
    // </View>
  );
}

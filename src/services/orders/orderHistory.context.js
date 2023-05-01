import React, { useState, createContext,useEffect } from "react";
import {
  GetOrderHistoryByDealerId,
  AddNewOrderService,
  GetOrderHistory
} from "./orderHistory.service";
import { onSnapshot } from "firebase/firestore";
export const OrderHistoryContext = createContext();

export const OrderHistoryContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderHistory, setOrderHistory] = useState(null);
  const [orderHistoryDealerSpecific, setOrderHistoryDealerSpecific] = useState(null);
  const [error, setError] = useState(null);
  const [sucess, setSucess] = useState(false);
  const [isOrderHistoryCallLoading, setIsOrderHistoryCallLoading] = useState(false);
  const [orderHistoryCallError, setOrderHistoryCallError] = useState(false);
  const [orderHistoryCallsucess, setOrderHistoryCallsucess] = useState(false);
  const [addNewOrderSucess, setAddNewOrderSucess] = useState(false);
  const [addNewOrderApiCallInprogress, setAddNewOrderApiCallInprogress] =
    useState(false);
    
  const fetchOrderHistoryByDealerId = (dealerId) => {
    setIsOrderHistoryCallLoading(true);
    console.log(
      "in function fetch fetchOrderHistoryByDealerId in context dealer id ",
      dealerId
    );

    GetOrderHistoryByDealerId(dealerId)
      .then((snapshot) => {
        const orderHistoryList = [];
        setOrderHistoryDealerSpecific(orderHistoryList);
        snapshot.docs.forEach((doc) => {
          orderHistoryList.push({ ...doc.data(), id: doc.id });
        });
        setOrderHistoryDealerSpecific(orderHistoryList);
        console.log("orderHistoryList fron db is ", orderHistoryList);
        setIsOrderHistoryCallLoading(false);
        setOrderHistoryCallsucess(true);
      })
      .catch((e) => {
        setSucess(false);
        setIsOrderHistoryCallLoading(false);
        setOrderHistoryCallError(e.toString());
        console.log(e);
      });
  };

  const fetchOrderHistory = () => {
    setIsLoading(true);
    console.log(
      "in function fetch fetchOrderHistory in context");

    GetOrderHistory()
      .then((snapshot) => {
        const orderHistoryList = [];
        setOrderHistory(orderHistoryList);
        snapshot.docs.forEach((doc) => {
          orderHistoryList.push({ ...doc.data(), id: doc.id });
        });
        setOrderHistory(orderHistoryList);
        console.log("orderHistoryList fron db is ", orderHistoryList);
        setIsLoading(false);
        setSucess(true);
      })
      .catch((e) => {
        setSucess(false);
        setIsLoading(false);
        setError(e.toString());
        console.log(e);
      });
  };


  const AddNewOrder = (orderHistory) => {
    setIsLoading(true);
    console.log(
      "AddNewOrderApiCallInprogress was",
      addNewOrderApiCallInprogress
    );
    setAddNewOrderApiCallInprogress(true);
    console.log(
      "in function AddNewOrderHistory in OrderHistoryContextProvider for",
      orderHistory.dealerId
    );
    console.log(
      "set AddNewOrderApiCallInprogress to ",
      addNewOrderApiCallInprogress
    );
    AddNewOrderService(orderHistory)
      .then(() => {
        console.log("addNewOrderSucess before setting", addNewOrderSucess);
        setAddNewOrderSucess(true);
        console.log("addNewOrderSucess set to", addNewOrderSucess);
        setSucess(true);
        setIsLoading(false);
        setAddNewOrderApiCallInprogress(false);
      })
      .catch((error) => {
        setSucess(false);
        setIsLoading(false);
        setAddNewOrderApiCallInprogress(false);
        setError(e.toString());
        console.log(e);
      });
  };
  return (
    <OrderHistoryContext.Provider
      value={{
        orderHistory,
        orderHistoryDealerSpecific,
        isLoading,
        addNewOrderApiCallInprogress,
        error,
        addNewOrderSucess,
        fetchOrderHistoryByDealerId,
        AddNewOrder,
        isOrderHistoryCallLoading,
        orderHistoryCallError,
        orderHistoryCallsucess,
        fetchOrderHistory
      }}
    >
      {children}
    </OrderHistoryContext.Provider>
  );
};

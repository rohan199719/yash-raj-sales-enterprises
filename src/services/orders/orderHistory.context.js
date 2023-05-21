import React, { useState, createContext, useEffect } from "react";
import {
  GetOrderHistoryByDealerId,
  AddNewOrderService,
  GetOrderHistory,
  GetOrderHistoryWithFilter,
} from "./orderHistory.service";
import { onSnapshot } from "firebase/firestore";
export const OrderHistoryContext = createContext();

export const OrderHistoryContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderHistory, setOrderHistory] = useState(null);
  const [orderHistoryDealerSpecific, setOrderHistoryDealerSpecific] =
    useState(null);
  const [error, setError] = useState(null);
  const [sucess, setSucess] = useState(false);
  const [isOrderHistoryCallLoading, setIsOrderHistoryCallLoading] =
    useState(false);
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
    console.log("in function fetch fetchOrderHistory in context");

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
  const fetchOrderHistoryWithfilter = (fromDate, toDate) => {
    console.log("in function fetch fetchOrderHistoryWithfilter in context");
    return GetOrderHistoryWithFilter(fromDate, toDate);
  };

  const AddNewOrder = (orderHistory) => {
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
    return AddNewOrderService(orderHistory);
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
        fetchOrderHistory,
        fetchOrderHistoryWithfilter,
      }}
    >
      {children}
    </OrderHistoryContext.Provider>
  );
};

import React, { useState, createContext } from "react";
import {
  GetPaymentHistoryByDealerId,
  AddPaymentHistory,
  GetPaymentHistory
} from "./paymentHistory.service";
import { onSnapshot } from "firebase/firestore";
export const PaymentHistoryContext = createContext();

export const PaymentHistoryContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState(null);
  const [error, setError] = useState(null);
  const [sucess, setSucess] = useState(false);

  const fetchPaymentHistoryByDealerId = (dealerId) => {
    setIsLoading(true);
    console.log(
      "in function fetch paymentHistoryByDealerId in context dealer id ",
      dealerId
    );

    GetPaymentHistoryByDealerId(dealerId)
      .then((snapshot) => {
        const paymentHistoryList = [];
        setPaymentHistory(paymentHistoryList);
        snapshot.docs.forEach((doc) => {
          paymentHistoryList.push({ ...doc.data(), id: doc.id });
        });
        setPaymentHistory(paymentHistoryList);
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

  const fetchPaymentHistory = () => {
    setIsLoading(true);
    console.log("in function fetch fetchPaymentHistory in context");
    GetPaymentHistory()
      .then((snapshot) => {
        const paymentHistoryList = [];
        setPaymentHistory(paymentHistoryList);
        snapshot.docs.forEach((doc) => {
          paymentHistoryList.push({ ...doc.data(), id: doc.id });
        });
        setPaymentHistory(paymentHistoryList);
        console.log("payment history lis after fetch is ",paymentHistoryList);
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

  const AddNewPaymentHistory = (paymentHistory) => {
    setIsLoading(true);
    console.log(
      "in function AddNewPaymentHistory in PaymentHistoryContext for",
      paymentHistory.dealerId
    );
    AddPaymentHistory(paymentHistory)
      .then(() => {
        setSucess(true);
        setIsLoading(false);
      })
      .catch((e) => {
        setSucess(false);
        setIsLoading(false);
        setError(e.toString());
        console.log(e);
      });
  };
  return (
    <PaymentHistoryContext.Provider
      value={{
        paymentHistory,
        isLoading,
        error,
        sucess,
        fetchPaymentHistoryByDealerId,
        fetchPaymentHistory,
        AddNewPaymentHistory,
      }}
    >
      {children}
    </PaymentHistoryContext.Provider>
  );
};

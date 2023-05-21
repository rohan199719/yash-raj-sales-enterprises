import React, { useState, createContext } from "react";
import {
  GetPaymentHistoryByDealerId,
  GetPaymentHistoryWithFilter,
  AddPaymentHistory,
  GetPaymentHistory,
} from "./paymentHistory.service";
import { onSnapshot } from "firebase/firestore";
export const PaymentHistoryContext = createContext();

export const PaymentHistoryContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState(null);
  const [paymentHistoryWithFilter, setPaymentHistoryWithFilter] =
    useState(null);
  const [paymentHistoryDealerSpecific, setPaymentHistoryDealerSpecific] =
    useState(null);
  const [error, setError] = useState(null);
  const [sucess, setSucess] = useState(false);

  const fetchPaymentHistoryByDealerIdWithFilter = (dealerId) => {
    console.log(
      "in function fetch fetchPaymentHistoryByDealerIdWithFilter in context dealer id ",
      dealerId
    );
  };

  const fetchPaymentHistoryByDealerId = (dealerId) => {
    setIsLoading(true);
    console.log(
      "in function fetch paymentHistoryByDealerId in context dealer id ",
      dealerId
    );

    GetPaymentHistoryByDealerId(dealerId)
      .then((snapshot) => {
        const paymentHistoryList = [];
        setPaymentHistoryDealerSpecific(paymentHistoryList);
        snapshot.docs.forEach((doc) => {
          paymentHistoryList.push({ ...doc.data(), id: doc.id });
        });
        setPaymentHistoryDealerSpecific(paymentHistoryList);
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
        console.log(
          "payment history list count after fetch is ",
          paymentHistoryList.length
        );
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

  const fetchPaymentHistoryWithfilter = (fromDate, toDate) => {
    console.log("in function fetch fetchPaymentHistoryWithfilter in context");
    return GetPaymentHistoryWithFilter(fromDate, toDate);
  };

  const AddNewPaymentHistory = (paymentHistory) => {
    console.log(
      "in function AddNewPaymentHistory in PaymentHistoryContext for",
      paymentHistory.dealerId
    );
    return AddPaymentHistory(paymentHistory);
  };
  return (
    <PaymentHistoryContext.Provider
      value={{
        paymentHistory,
        paymentHistoryDealerSpecific,
        isLoading,
        error,
        sucess,
        fetchPaymentHistoryByDealerId,
        fetchPaymentHistory,
        fetchPaymentHistoryWithfilter,
        paymentHistoryWithFilter,
        AddNewPaymentHistory,
        fetchPaymentHistoryByDealerIdWithFilter,
      }}
    >
      {children}
    </PaymentHistoryContext.Provider>
  );
};

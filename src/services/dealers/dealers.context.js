import React, { useState,createContext, useEffect,useRef } from "react";
import   useStateref  from "react-usestateref";
import { GetDealers, updatedealerInfo,AddDealers } from "./dealers.service";
import { getAuth } from "firebase/auth";
export const DealersContext = createContext();

export const DealerContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dealers, setDealers] = useState(null);
  const [error, setError] = useState(null);
  const  [addDelerError,setAddDelerError] = useState("");
  const updateDelearDueAmountById = (dealer) => {
    setIsLoading(true);
    console.log(
      "in function fetch updateDelearDueAmountById in context dealer id ",
      dealer.dealerId
    );
    updatedealerInfo(dealer)
      .then(() => {
        console.log("dealer due amount info updated");
        setIsLoading(false);
        
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
        
        console.log(e);
      });
  };
 const AddNewDealer = async (newDealer)=>{
  //setIsLoading(true);
  console.log("in function Add dealers in context");
  return AddDealers(newDealer);
 };

  const fetchDealers = () => {
    setIsLoading(true);
    console.log("in function fetch dealers in context");
    GetDealers()
      .then((snapshot) => {
        const dealerList = [];
        snapshot.docs.forEach((doc) => {
          const dealer = doc.data();
          dealer.paymentHistory = [];
          dealer.orderHiatory = [];
          dealerList.push({ ...dealer, id: doc.id });
        });
        setDealers(dealerList);

        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
        console.log(e);
      });
  };

  return (
    <DealersContext.Provider
      value={{
        dealers,
        isLoading,
        error,
        addDelerError,
        setAddDelerError,
        fetchDealers,
        AddNewDealer,
        updateDelearDueAmountById,
      }}
    >
      {children}
    </DealersContext.Provider>
  );
};

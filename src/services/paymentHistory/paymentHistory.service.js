import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

export const GetPaymentHistoryByDealerId = (d_id) => {
  console.log("in service method with dealerId", d_id);
  const db = getFirestore();
  const colref = collection(db, "paymentHistory");
  const q = query(
    colref,
    where("dealerId", "==", d_id),
    orderBy("paymentDateTimestamp", "desc")
  );
  return getDocs(q);
};

export const GetPaymentHistory = () => {
  console.log("in service method GetPaymentHistory");
  const db = getFirestore();
 
  const colref = collection(db, "paymentHistory");

  var now = new Date();
  const thirtyDayAgo = new Date().setDate(now.getDate()-30);
  console.log(thirtyDayAgo);
 
  const q = query(
    colref,
    where("paymentDateTimestampString", ">=",thirtyDayAgo.valueOf()),
    orderBy("paymentDateTimestampString", "desc")
  );
  return getDocs(q);
};


export const AddPaymentHistory = (paymentHistory) => {
  console.log(
    "in service AddPaymentHistory method with dealerId",
    paymentHistory.dealerId
  );
  const db = getFirestore();
  const colref = collection(db, "paymentHistory");
  return addDoc(colref, paymentHistory);
};

import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
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
  console.log("query formed is ", q);
  console.log("after query formed");
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

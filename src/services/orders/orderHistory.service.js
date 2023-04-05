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

export const GetOrderHistoryByDealerId = (d_id) => {
  console.log(
    "in service GetOrderHistoryByDealerId method with dealerId",
    d_id
  );
  const db = getFirestore();
  const colref = collection(db, "orders");
  const q = query(
    colref,
    where("dealerId", "==", d_id),
    orderBy("orderDateTimestamp", "desc")
  );
  console.log("query formed is ", q);
  return getDocs(q);
};

export const GetOrderHistory = () => {
  console.log(
    "in service GetOrderHistory");
  const db = getFirestore();
  const colref = collection(db, "orders");
  var now = new Date();
  const thirtyDayAgo = new Date().setDate(now.getDate()-30);
  console.log(thirtyDayAgo.valueOf());

  const q = query(
    colref,
    where("orderDateTimestampString", ">=", thirtyDayAgo.valueOf()),
    orderBy("orderDateTimestampString", "desc")
  );
  return getDocs(q);
};


export const AddNewOrderService = (newOrder) => {
  console.log(
    "in service AddOrderHistory method with dealerId",
    newOrder.dealerId
  );
  const db = getFirestore();
  const colref = collection(db, "orders");
  return addDoc(colref, newOrder);
};

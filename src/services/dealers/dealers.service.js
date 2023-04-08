import {
  getFirestore,
  collection,
  doc,
  getDocs,
  updateDoc,
  addDoc,
} from "firebase/firestore";

export const GetDealers = () => {
  const db = getFirestore();
  const colref = collection(db, "dealers");
  return getDocs(colref);
};

export const AddDealers = (newDealer) => {
  console.log(
    "in service AddDealers method");
  const db = getFirestore();
  const colref = collection(db, "dealers");
  return addDoc(colref, newDealer);
};

export const updatedealerInfo = (dealer) => {
  const db = getFirestore();
  const docRef = doc(db, "dealers", dealer.id);
  return updateDoc(docRef, {
    dueAmount: dealer.dueAmount,
    lastOrderDate: dealer.lastOrderDate != null ? dealer.lastOrderDate : "",
    lastPaymentDate:
      dealer.lastPaymentDate != null ? dealer.lastPaymentDate : "",
  });
};

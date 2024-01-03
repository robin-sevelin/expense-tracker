// import { useEffect, useState } from "react";
// import { balanceAtom } from "../store/atoms";
// import { auth } from "@/firebase/auth";
// import { createUserDocument } from "@/firebase/firestore";
// import { getRedirectResult } from "firebase/auth";
// import { useAtom } from "jotai";
// import { IUser } from "../models/IUser";

// export const useGetBalance = () => {
//     const [, setBalance] = useAtom(balanceAtom);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//       const getData = async () => {
//         try {
//           const response = await getRedirectResult(auth);
//           if (response) {
//             setUser(response.user as IUser);
//             await createUserDocument(response.user as IUser);
//           }
//         } catch (error) {
//           console.error('Error during login:', error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       getData();
//     }, [setUser]);

//     return { loading };};

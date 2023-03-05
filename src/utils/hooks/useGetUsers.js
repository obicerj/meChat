import { collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../firebase";

let latestDoc = null;

const useGetUsers = (userID) => {
  const [users, setUsers] = useState([]);
  const [isMaximum, setIsMaximum] = useState(false);

  let usersColRef;

  const getUsers = async (userID) => {
    try {
      if (isMaximum) return;

      // Exclude logged in user in the results using userID
      if (userID) {
        usersColRef = query(
          collection(db, "users"),
          where("uid", "!=", userID),
          orderBy("uid"),
          startAfter(latestDoc || 0),
          limit(24)
        );
      } else {
        usersColRef = collection(db, "users");
      }
      const data = await getDocs(usersColRef);

      const users = data.docs.map((doc) => {
        return { ...doc.data() };
      });

      latestDoc = data.docs[data.docs.length - 1];

      if (data.empty) {
        setIsMaximum(true);
      }

      setUsers(() => [...users]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers(userID);
    latestDoc = null;

    return () => {
      latestDoc = null;
    };
  }, []);

  return { users, getUsers };
}

export default useGetUsers;
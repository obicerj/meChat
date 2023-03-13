import React, { useState } from "react";
import { collection, getDocs, query, setDoc, where, doc, updateDoc, getDoc, serverTimestamp, arrayUnion, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import useGetUsers from "../../utils/hooks/useGetUsers";
import { changeConvo } from "../conversation/convoSlice";
import Avatar from "../../components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { getUserState } from "../auth/userSlice";
import AddContactModal from "./AddContactModal";

const SearchPeople = () => {
  const [ usersList, setUsersList ] = useState([]);
  const [ searchVal, setSearchVal ] = useState([]);
  const [ showModal, setShowModal ] = useState(false);

  const [ selectedUser, setSelectedUser ] = useState({});

  const dispatch = useDispatch();

  const [ err, setErr ] = useState("");
  const { user: currentUser } = useSelector(getUserState);
  const [addRecipient, setAddRecipient] = useState();
  const { users } = useGetUsers(currentUser.uid);


  const handleSearch = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("displayName", "!=", currentUser?.displayName || ""),
        where("displayName", ">=", searchVal),
        where("displayName", "<=", searchVal + "\uf8ff")
      );

      const data = await getDocs(q);
      const users = data.docs.map((doc) => {
        return { ...doc.data() };
      });

      setUsersList(users);


    } catch (err) {
      console.log(err)
    }

  };

  const handleKey = (e) => {
    const searchVal = e.target.value;
    setSearchVal(searchVal);
    handleSearch();

  };


  const handleAddContact = (recipientUser) => {
    setShowModal((current) => !current);
    setAddRecipient(recipientUser)
  }


  return (
    <>
      <div className="flex flex-col sticky top-0 bg-slate-900 z-10">
        <div className="flex flex-col justify-between px-2 py-2 mx-2 mt-2">
          <h2 className="text-2xl text-gray-300">Search</h2>
          
          <input
            type="text"
            placeholder="Search"
            onKeyUp={handleKey}
            onChange={(e) => setSearchVal(e.target.value)}
            name=""
            id=""
            className="w-full bg-slate-300 rounded-full mt-4 py-1.5 px-2.5 outline-0"
          />
        </div>
      </div>

      <div className="mt-4 mx-2">
        <ul className="flex flex-col gap-2 mt-4">
          {err && <p className="text-white">User not found</p>}
          
          {usersList.length == 0 && searchVal.length == 0 && (
            <>
              {users?.length !== 0 &&
                users?.map((user, i) => (
                  <li
                    onClick={() => handleAddContact(user)}
                    key={i}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:cursor-pointer 
                  hover:bg-gray-700/50"
                  >
                    <div>
                      <Avatar
                        imgURL={`https://picsum.photos/seed/${user.displayName}/200/200`}
                        size={"small"}
                      />
                    </div>
                    <div>
                      <h2 className="text-md text-gray-100">
                        {user.displayName}
                      </h2>
                    </div>
                  </li>
                ))}
            </>
          )}

          {usersList && (
            <>
              {usersList?.length !== 0 &&
                usersList?.map((user, i) => (
                  <li
                    onClick={() => handleAddContact(user)}
                    key={i}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:cursor-pointer 
                  hover:bg-gray-700/50"
                  >
                    <div>
                      <Avatar
                        imgURL={`https://picsum.photos/seed/${user.displayName}/200/200`}
                        size={"small"}
                      />
                    </div>
                    <div>
                      <h2 className="text-md text-gray-100">
                        {user.displayName}
                      </h2>
                    </div>
                  </li>
                ))}
            </>
          )}

          {usersList.length == 0 && searchVal.length != 0 && (
            <>
              <div className="flex justify-center">
                <p className="mt-12 text-gray-400">No users found</p>
              </div>
            </>
          )}

          { showModal && (
              <AddContactModal 
                setShowModal={setShowModal}
                currentUser={currentUser}
                recipient={addRecipient}
              />
          ) }
        </ul>
      </div>
    </>
  );

};

export default SearchPeople;

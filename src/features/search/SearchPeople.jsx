import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs, query, setDoc, where, doc, updateDoc, getDoc, serverTimestamp, arrayUnion, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import useGetUsers from "../../utils/hooks/useGetUsers";
import { changeConvo } from "../../reducers/convoReducer";
import { ConvoContext } from "../../context/ConvoContext";
import Avatar from "../../components/Avatar";

const SearchPeople = () => {
  const [ usersList, setUsersList ] = useState([]);
  const [ searchVal, setSearchVal ] = useState([]);
  const [ err, setErr ] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { users } = useGetUsers(currentUser.uid);
  const { dispatch } = useContext(ConvoContext);

  const handleSearch = async () => {
    // const q = query(collection(db, "users"), where("displayName", "==", username))
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

      // console.log(users)

    } catch (err) {
      console.log(err)
    }

    // console.log('searching', username)

    // try {
    //   const querySnapshot = await getDocs(q);
    //   querySnapshot.forEach((doc) => {
    //     // console.log(doc.id, "=>", doc.data());
    //     setUser(doc.data());
    //   })
    // } catch (err) {
    //   setErr(true);
    // }
  };

  const handleKey = (e) => {
    const searchVal = e.target.value;
    setSearchVal(searchVal);
    handleSearch();
    // console.log(user);

  };

  useEffect(() => {
    dispatch({ type: "CHANGE_USER", payload: "" });

  }, [currentUser.uid])

  const handleSelect = async (user) => {

    dispatch({ type: "CHANGE_USER", payload: user });


    // check if group chat exists in firestore
    // if not create 
    const combinedId = currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;

    try {

      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // create chat in chat collection
        await setDoc(doc(db, "chats", combinedId), {
          message: []
        });

        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName
          },
          [combinedId + ".date"]: serverTimestamp()
        });

        // console.log('tx', data.chatId)
      }

    } catch (err) {
      // setUser(null);
      // setUsername("");
      console.log(err)
    }

  }

  const addContact = async (recipient) => {


    try {

      dispatch(changeConvo({ recipient }));

      console.log(recipient)

      const combinedId = currentUser.uid > recipient.uid
        ? currentUser.uid + recipient.uid
        : recipient.uid + currentUser.uid;

      const userDocRef = doc(db, "users", currentUser.uid);
      const recipientDocRef = doc(db, "users", recipient.uid);

      const chatDocRef = doc(db, "chats", String(combinedId));
      const chatDocData = await getDoc(chatDocRef);

      const userChatDocRef = doc(db, "userChats", String(currentUser.uid));
      const recipientChatDocRef = doc(db, "userChats", String(recipient.uid));

      if (!chatDocData.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // await updateDoc(userDocRef, {
        //   contacts: arrayUnion(recipient.uid),
        // });

        // await updateDoc(recipientDocRef, {
        //   contacts: arrayUnion(currentUser.uid),
        // });

        // const userChatInfo = {
        //   userInfo: {
        //     displayName: recipient.displayName,
        //     uid: recipient.uid,
        //   },
        // }


        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: recipient.uid,
            displayName: recipient.displayName
          },
          [combinedId + ".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", recipient.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName
          },
          [combinedId + ".date"]: serverTimestamp()
        });

        // const recipientChatInfo = {
        //   ...userChatInfo,
        //   userInfo: {
        //     uid: currentUser.uid,
        //   },
        // };


      }

    } catch (err) {
      console.log(err)
    }

  };

  const handleAdd = async (recipient) => {
    const combinedId = currentUser.uid > recipient.uid
      ? currentUser.uid + recipient.uid
      : recipient.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) return;

      await addContact(recipient);


    } catch (err) {
      console.log(err)
    }
  };


  return (
    <>
      <div className="flex flex-col sticky top-0 bg-slate-900">
        <div className="flex flex-col justify-between px-2 py-2 mx-2 mt-2">
          <h2 className="text-2xl text-gray-300">Search</h2>
          {/* <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button> */}
        <input
          type="text"
          placeholder="Search"
          onKeyUp={handleKey}
          onChange={(e) => setSearchVal(e.target.value)}
          // value={searchVal}
          name=""
          id=""
          className="w-full bg-slate-300 rounded-full mt-4 py-1.5 px-2.5 outline-0"
        />
        </div>
        
      </div>


      <div className="mt-4 mx-2">
        <ul className="flex flex-col gap-2 mt-4">
          {err && <p className="text-white">User not found</p>}
          {/* {user &&
            <li
              onClick={handleSelect}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:cursor-pointer 
                  hover:bg-gray-700/50">
              <div>
                <img src="https://via.placeholder.com/150" className="w-11 h-11 rounded-full" />
              </div>
              <div>
                <h2 className="text-md">{user.displayName}</h2>
               </div>
             </li>
          } */}
          {usersList.length == 0 && searchVal.length == 0 && (
            <>
              {users?.length !== 0 &&
                users?.map((user, i) => (
                  <li
                    onClick={() => handleSelect(user)}
                    key={i}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:cursor-pointer 
                  hover:bg-gray-700/50"
                  >
                    <div>
                      <Avatar 
                      imgURL={`https://picsum.photos/seed/${user.displayName}/200/200`}
                      size={'small'}
                      />
                    </div>
                    <div>
                      <h2 className="text-md text-gray-100">{user.displayName}</h2>
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
                    onClick={() => handleSelect(user)}
                    key={i}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:cursor-pointer 
                  hover:bg-gray-700/50"
                  >
                    <div>
                      <Avatar 
                      imgURL={`https://picsum.photos/seed/${user.displayName}/200/200`}
                      size={'small'}
                      />
                    </div>
                    <div>
                      <h2 className="text-md text-gray-100">{user.displayName}</h2>
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
        </ul>
      </div>
    </>
  );

};

export default SearchPeople;

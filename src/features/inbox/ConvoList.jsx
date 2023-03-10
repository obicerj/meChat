import { current } from "@reduxjs/toolkit";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../components/Avatar";
import { AuthContext } from "../../context/AuthContext";
import { ConvoContext } from "../../context/ConvoContext";
import { db } from "../../firebase";
import useFormatDate from "../../utils/hooks/useFormatDate";
import { getUserState } from "../auth/userSlice";
import { changeConvo, getConvoState } from "../conversation/convoSlice";


const ConvoList = () => {
  const { user: currentUser } = useSelector(getUserState);

  // const [chats, setChats] = useState();

  const [recipient, setRecipient] = useState();
  const [lastMessageDate, setLastMessageDate] = useState("");
  
  const { chatId } = useSelector(getConvoState);
  
  const [convos, setConvos] = useState([]);
  
  const dispatch = useDispatch();
  // const { currentUser } = useContext(AuthContext);
  // const { dispatch } = useContext(ConvoContext);

  const formatDate = useFormatDate();

  // useEffect(() => {
  //   dispatch({ type: "CHANGE_USER", payload: ""});

  //   const getConvos = () => {
  //     const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), async (doc) => {
  //       setConvos(doc.data());
  //     });
  //     return () => {
  //       unsub();
  //     };
  //   };

  //   currentUser.uid && getConvos();
  // }, [currentUser.uid]);

  const handleSelect = (recipient) => {
    // dispatch({ type: "CHANGE_USER", payload: u});
    dispatch(changeConvo({ recipient }));
  };

  useEffect(() => {
    if(!currentUser.uid) return;

    const userChatsDocRef = doc(db, "userChats", currentUser.uid);
    const unsub = onSnapshot(userChatsDocRef, async (doc) => {
      const convos = Object.entries({...doc.data()});
      setConvos(convos);
    });

    return () => {
      unsub();
    };
  }, [currentUser.uid]);

  

  

  return (
    <>
      <div className="flex flex-col sticky top-0 bg-slate-900 z-10">
        {/* HEADER */}
        <header className="flex flex-row justify-between px-2 py-2 mt-2">
          <h2 className="text-2xl text-gray-300 mx-2">Chats</h2>
        </header>
      </div>
      <main>
        {!convos && 
          <p>No convo</p>
        }

        {convos && (
          <ul className="flex flex-col gap-2 mt-2 mx-2">
            {convos
              ?.sort((a, b) => b[1].date - a[1].date)
              .map((convo) => {
                return (
                  <li
                    key={convo[0]}
                    onClick={() => handleSelect(convo[1].userInfo)}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:cursor-pointer 
                  hover:bg-gray-700/50"
                  >
                    <div>
                      <Avatar imgURL={`https://picsum.photos/seed/${convo[1].userInfo.displayName}/200/200`}/>
                    </div>
                    <div>
                      <h2 className="text-md text-gray-100">
                        {convo[1].userInfo.displayName}
                      </h2>
                      {/* LAST MESSAGE */}
                      {convo[1].lastMessage && (
                        <p className="text-xs text-gray-400">
                          {convo[1].lastMessage?.text} <span>• </span>
                          <time className="w-fit">
                            {formatDate(convo[1].date?.toDate())}
                          </time>
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
          </ul>
        )}
      </main>
    </>
  );
};

export default ConvoList;

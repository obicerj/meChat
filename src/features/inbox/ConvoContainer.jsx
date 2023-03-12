import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import { getUserState } from "../auth/userSlice";
import { changeConvo } from "../conversation/convoSlice";
import ConvoList from "./ConvoList";

const ConvoContainer = () => {
  const { user: currentUser } = useSelector(getUserState);

  const [convos, setConvos] = useState([]);
  
  const dispatch = useDispatch();

  const handleSelectConvo = (recipient) => {
    dispatch(changeConvo({recipient}));
  }

  useEffect(() => {
    if(!currentUser.uid) return;

    const userChatsDocRef = doc(db, "userChats", currentUser.uid);
    const unsub = onSnapshot(userChatsDocRef, async(doc) => {
      const convos = Object.entries({...doc.data()});
      setConvos(convos);
    });

    return () => {
      unsub();
    }
  }, [currentUser.uid]);

  // console.log(convos);

  return (
    <>
      <div className="flex flex-col sticky top-0 bg-slate-900 z-10">
        {/* HEADER */}
        <header className="flex flex-row justify-between px-2 py-2 mt-2">
          <h2 className="text-2xl text-gray-300 mx-2">Chats</h2>
        </header>
      </div>

      <main>
        {!convos && <p>No convo</p>}

        {convos && (
          <ul className="flex flex-col gap-2 mt-2 mx-2">
            {convos
              ?.sort((a, b) => b[1].date - a[1].date)
              .map((convo) => {
                return (<ConvoList 
                key={convo[0]} 
                convo={convo} 
                handleSelectConvo={handleSelectConvo}
                />);
              })}
          </ul>
        )}
      </main>
    </>
  );
};

export default ConvoContainer;

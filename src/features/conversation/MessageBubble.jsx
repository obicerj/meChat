import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import Avatar from "../../components/Avatar";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";

const MessageBubble = ({ message }) => {
  const { currentUser } = useContext(AuthContext);

  const [msgDate, setMsgDate] = useState("");
  const [senderData, setSenderData] = useState();

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const getUserInfo = async (userId) => {
    const recipientDocRef = doc(db, "users", userId);
    const recipientData = (await getDoc(recipientDocRef)).data();

    return recipientData;
  };

  useEffect(() => {
    getUserInfo(message.senderId).then((senderData) => {
      setSenderData(senderData);
    });

    // const date = formatDate(message.date.toDate());
    // setMsgDate(date as string);
  }, []);
  
  return (
    <>
    {message.senderId === currentUser.uid ? 
    //{/* Sender */}
      (<div ref={ref} className="py-0.5">
        <div className="flex gap-2 py-1 flex-row-reverse">
          <div className="flex flex-col gap-0.5 items-end">
            <div className="flex gap-2 items-end flex-row-reverse">
              <button className="flex bg-blue-500 rounded-3xl py-2 px-3 text-md max-w-xs w-fit h-fit text-start break-words text-white rounded-br-sm">
                {message?.text}
              </button>
            </div>
          </div>
        </div>
        <div className="text-xs flex gap-1 items-center">
          <time className="ml-auto text-gray-400">Date</time>
        </div>
      </div>)
      :
      // {/* Recepient */}
      (<div className="py-0.5 flex flex-col items-start">
        <div className="flex gap-2 py-1 items-start">
          <div className="flex flex-col gap-0.5 items-center">
            <div className="flex gap-2 items-center">
              <button>
                <div>
                  <Avatar 
                    imgURL={'https://via.placeholder.com/150'}
                    size={'small'}
                  />
                </div>
              </button>
              <button
                className="flex bg-blue-500 rounded-3xl py-2 px-3 text-md max-w-xs w-fit 
                    h-fit text-start break-words text-white rounded-bl-sm"
              >
                {message?.text}
              </button>
            </div>
          </div>
        </div>
        <div className="text-xs flex gap-1 items-center">
          <span className="text-gray-400">{senderData?.displayName} • </span>
          <time className="ml-auto text-gray-400">Date</time>
        </div>
      </div>)
  }
    </>
  );
};

export default MessageBubble;

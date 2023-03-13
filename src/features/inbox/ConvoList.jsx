import React, { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import useFormatDate from "../../utils/hooks/useFormatDate";
import { useGetUser } from "../../utils/hooks/useGetUsers";


const ConvoList = ({convo, handleSelectConvo}) => {
  const [recipient, setRecipient] = useState();
  const [lastMessageDate, setLastMessageDate] = useState("");

  const formatDate = useFormatDate();

  const getUserInfo = useGetUser();

  const handleConvoListSelect = () => {
    handleSelectConvo(recipient);
  };

  useEffect(() => {
    const recipientID = convo[1].userInfo.uid;
    getUserInfo(recipientID).then((recipientInfo) => {
      setRecipient(recipientInfo);
    });
  }, []);

  useEffect(() => {
    const date = formatDate(convo[1].date?.toDate());
    setLastMessageDate(date);
  }, [convo[1].lastMessage?.message]);

  return (
    <>
      <li
        onClick={handleConvoListSelect}
        className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:cursor-pointer 
                  hover:bg-gray-700/50"
      >
        <div>
          <Avatar
            imgURL={`https://picsum.photos/seed/${recipient?.displayName}/200/200`}
          />
        </div>
        <div>
          <h2 className="text-md text-gray-100">
            {recipient?.displayName}
          </h2>
          {/* LAST MESSAGE */}
          {convo[1].lastMessage && (
            <p className="text-xs text-gray-400">
              {convo[1].lastMessage?.text || `Start conversation`} 
              {
              convo[1].lastMessage.text &&
              (<span> • </span>)
              }
              <time className="w-fit">
                {formatDate(convo[1].date?.toDate())}
              </time>
            </p>
          )}
        </div>
      </li>
    </>
  );
};

export default ConvoList;

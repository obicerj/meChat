import React from "react";
import Avatar from "../../components/Avatar";

const MessageBubble = () => {
  return (
    <>
      {/* Sender */}
      <div className="py-0.5">
        <div className="flex gap-2 py-1 flex-row-reverse">
          <div className="flex flex-col gap-0.5 items-end">
            <div className="flex gap-2 items-end flex-row-reverse">
              <button className="flex bg-blue-500 rounded-3xl py-2 px-3 text-md max-w-xs w-fit h-fit text-start break-words text-white rounded-br-sm">
                Sender message
              </button>
            </div>
          </div>
        </div>
        <div className="text-xs flex gap-1 items-center">
          <time className="ml-auto text-gray-400">Date</time>
        </div>
      </div>

      {/* Recepient */}
      <div className="py-0.5 flex flex-col items-start">
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
                Recipient message reply
              </button>
            </div>
          </div>
        </div>
        <div className="text-xs flex gap-1 items-center">
          <span className="text-gray-400">Recepient name • </span>
          <time className="ml-auto text-gray-400">Date</time>
        </div>
      </div>
    </>
  );
};

export default MessageBubble;

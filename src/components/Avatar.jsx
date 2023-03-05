import React from "react";

const Avatar = ({ imgURL, isOnline, className, size }) => {
  const setSize = (size) => {
    switch(size) {
      case "small":
        return "w-8 h-8";
      case "medium":
        return "w-12 h-12";
      case "large":
        return "w-14 h-14";
      default:
        return "w-8 h-8";
    }
  }
  return (
    <div className={` ${className} relative  ${setSize(size)}`}>
      <img src={ imgURL } className={` rounded-full ${setSize(size)} `} />
      <div
        className={`${isOnline ? 'bg-green-500' : ''} p-1.5 rounded-full absolute right-0 bottom-0`}
      ></div>
    </div>
  );
};

export default Avatar;

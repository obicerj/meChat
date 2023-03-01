import React from "react";

const Caster = ({ imgURL, heading, message, className }) => {
  return (
    <div className={ className }>
      <img src={ imgURL } />
      <h1 className="text-xl">{heading}</h1>
      <p className="text-sm">{message}</p>
    </div>
    );
};

export default Caster;

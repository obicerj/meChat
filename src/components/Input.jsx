import React from "react";

const Input = ({ 
  labelClass, 
  labelText, 
  inputType, 
  inputName, 
  inputID,
  inputPlaceholder,
  inputClass,
  value,
  setValue
}) => {
  return (
    <>
      <label className={`text-slate-300 font-medium ${labelClass}`}>{labelText}</label>
      <input
        type={inputType}
        name={inputName}
        value={value}
        onChange={(e) => setValue && setValue(e.target.value)}
        id={inputID}
        placeholder={inputPlaceholder}
        className={`
        border rounded-lg text-lg px-4 py-2.5
        focus:outline-0
        focus:ring-2
        focus:ring-blue-400
        ${inputClass}
        `}
      />
    </>
  );
};

export default Input;

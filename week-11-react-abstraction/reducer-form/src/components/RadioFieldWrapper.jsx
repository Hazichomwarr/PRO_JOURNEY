import React from "react";

export const RadioFieldWrapper = ({ children }) => {
  return (
    <fieldset className=" mt-4 p-2 font-medium shadow bg-white">
      <legend>Choose your Preferred Contact Method:</legend>
      <div className="flex justify-center">{children}</div>
    </fieldset>
  );
};

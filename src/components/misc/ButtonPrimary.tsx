import React from "react";

const ButtonPrimary = ({ children, addClass, onclick, href, style }) => {
  return (
    <button
      className={
        "py-3 lg:py-4 px-12 lg:px-16 text-white font-semibold rounded-lg bg-[#3538CD] hover:shadow-orange-md transition-all outline-none " +
        addClass
      }
      onClick={(e) => onclick(e, href)}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;

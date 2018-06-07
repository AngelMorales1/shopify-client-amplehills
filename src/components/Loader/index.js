import React from "react";

const Loader = ({ message }) => {
  return (
    <div
      className={`Loader flex justify-center items-center absolute-cover bg-black text-white p2`}
    >
      <span>{message ? message : "Loading..."}</span>
    </div>
  );
};

export default Loader;

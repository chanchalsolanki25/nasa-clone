import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
      <Link to="/" className="relative flex items-center md:justify-center">
        <p className="bg-blue-900 rounded-full md:h-16 md:w-16 h-12 w-12 absolute z-0 md:left-auto left-4"></p>
        <p className="md:text-5xl text-3xl flex justify-center items-center relative z-10 font-['Roboto'] uppercase">
          NASA
        </p>
      </Link>
  );
}

export default Logo;

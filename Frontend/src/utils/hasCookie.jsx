import React from "react";

const HasCookie = () => {
  return document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("jwtCookie="));
};

export default HasCookie;

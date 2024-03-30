"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          color: "#E2F3F5",
          background: "#120f25a4",
        },
      }}
    />
  );
};

export default ToasterProvider;

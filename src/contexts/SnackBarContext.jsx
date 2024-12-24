import React, { createContext, useState } from "react";

export const SnackBarContext = createContext();

const SnackBarProvider = ({ children }) => {
  const [snacks, setSnacks] = useState([]);
  // const addSuccessSnack = (content) => {
  //   setSnacks([
  //     ...snacks,
  //     {
  //       id: new Date().getTime(),
  //       type: "success",
  //       content,
  //     },
  //   ]);
  // };
  // const addErrorSnack = (content) => {
  //   setSnacks([
  //     ...snacks,
  //     {
  //       id: new Date().getTime(),
  //       type: "error",
  //       content,
  //     },
  //   ]);
  // };
  // const addWarningSnack = (content) => {
  //   setSnacks([
  //     ...snacks,
  //     {
  //       id: new Date().getTime(),
  //       type: "warning",
  //       content,
  //     },
  //   ]);
  // };
  // const addInfoSnack = (content) => {
  //   setSnacks([
  //     ...snacks,
  //     {
  //       id: new Date().getTime(),
  //       type: "info",
  //       content,
  //     },
  //   ]);
  // };

  const addSnack = (status, content) => {
    setSnacks([
      ...snacks,
      {
        id: new Date().getTime() + new Date().getSeconds(),
        type: status,
        content,
      },
    ]);
  };

  const removeSnack = (snackId) => {
    const rslt = snacks.filter((o) => o.id !== snackId);
    setSnacks(rslt);
  };
  return (
    <SnackBarContext.Provider value={{ snacks, addSnack, removeSnack }}>
      {children}
    </SnackBarContext.Provider>
  );
};

export default SnackBarProvider;

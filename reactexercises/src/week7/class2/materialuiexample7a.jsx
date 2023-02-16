import React, { useReducer } from "react";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../theme";
//import MaterialUIEx7b from "./materialuiex7b";
import "../../App.css";
import MaterialUIEx7b from "./materialuiexample7b";
import { Snackbar } from "@mui/material";
const MaterialUIEx7a = () => {
  const initialState = {
    snackbarMsg: "",
    msgFromParent: "data from parent",
    gotData: false,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ gotData: false });
  };
  const msgFromChild = (msg) => {
    setState({ snackbarMsg: msg, gotData: true });
  };
  console.log(
    "🚀 ~ file: materialuiexample7a.jsx:17 ~ MaterialUIEx7a ~ state",
    state
  );
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          border: "solid",
          padding: "10vw",
          textAlign: "center",
          marginTop: "10vh",
        }}
      >
        <div
          style={{
            fontSize: "x-large",
            fontFamily: "verdana",
            fontWeight: "bold",
            color: "#417505",
          }}
        >
          Exercise #7a - Parent Component
        </div>
        <MaterialUIEx7b
          dataFromChild={msgFromChild}
          dataForChild={state.msgFromParent}
        />
      </div>
      <Snackbar
        open={state.gotData}
        message={state.snackbarMsg}
        autoHideDuration={4000}
        onClose={snackbarClose}
      />
    </ThemeProvider>
  );
};
export default MaterialUIEx7a;

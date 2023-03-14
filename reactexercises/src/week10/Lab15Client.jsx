import { useReducer, useEffect, useRef } from "react";
import io from "socket.io-client";

import { ThemeProvider } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Snackbar,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import theme from "../../theme";
import "../App.css";
import AddCircle from "@mui/icons-material/AddCircle";

const Lab15Client = (props) => {
  const initialState = { userName: "", roomName: "", msg: "", roomMsg: "" };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return; // React 18 Strictmode runs useEffects twice in development`
    serverConnect();
    effectRan.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const socket = io.connect("localhost:5000", {
    forceNew: true,
    transports: ["websocket"],
    autoConnect: true,
    reconnection: false,
    timeout: 5000,
  });

  const serverConnect = () => {
    try {
      // connect to server locally

      if (socket.io._readyState === "opening") {
        setState({ msg: "trying to get connection..." });
      } else {
        setState({ msg: "can't get connection - try later!" });
      }
    } catch (err) {
      console.log(err);
      setState({ msg: "some other problem occurred" });
    }
  };

  const onJoinClicked = async () => {
    socket.emit(
      "join",
      { name: state.userName, room: state.roomName },
      (err) => {}
    );
    socket.on("welcome", onWelcome);
    socket.on("newclient", newClientJoined);
    setState({ socket: socket });
    console.log(
      "🚀 ~ file: Lab15Client.jsx:62 ~ onJoinClicked ~ socket:",
      socket.io._readyState
    );

    socket.io._readyState === "closed" &&
      setState({
        msg: "can't get connection - try later!",
        showMsg: true,
      });
  };
  const snackbarClose = () => {
    setState({ showMsg: false });
  };

  const onWelcome = (welcomeMsgFromServer) => {
    setState({ showMsg: true, msg: welcomeMsgFromServer });
  };

  const newClientJoined = (joinMsgFromServer) => {
    setState({ showMsg: true, roomMsg: joinMsgFromServer });
  };

  const emptyorundefined =
    state.roomName === undefined ||
    state.roomName === "" ||
    state.userName === undefined ||
    state.userName === "";

  const handleUserNameInput = (e) => {
    setState({ userName: e.target.value });
  };
  const handleRoomNameInput = (e) => {
    setState({ roomName: e.target.value });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="card">
        <CardHeader
          title="Lab 15 - Socket.io"
          color="inherit"
          style={{ textAlign: "center" }}
        />
        <CardContent d>
          <div
            className="flex"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              onChange={handleUserNameInput}
              placeholder="Enter your username"
              value={state.userName}
            />
            <p></p>
            <TextField
              onChange={handleRoomNameInput}
              placeholder="Enter Room name"
              value={state.roomName}
            />

            <Button
              color="secondary"
              variant="contained"
              style={{ marginTop: 50, float: "right" }}
              onClick={onJoinClicked}
              disabled={emptyorundefined}
              // title="Join"
            >
              Join
              {/*  <AddCircle fontSize="large" /> */}
            </Button>
          </div>
          <Typography borderTop={1} paddingTop={2} marginTop={2}>
            {state.roomMsg}
          </Typography>
          <Snackbar
            open={state.showMsg}
            message={state.msg}
            autoHideDuration={4000}
            onClose={snackbarClose}
          />
        </CardContent>
      </div>
    </ThemeProvider>
  );
};
export default Lab15Client;

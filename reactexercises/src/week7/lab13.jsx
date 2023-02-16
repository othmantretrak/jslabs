import React, { useEffect, useReducer, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Autocomplete,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  AppBar,
  Toolbar,
  Snackbar,
} from "@mui/material";
import theme from "./theme";
import "../App.css";
const Lab13 = () => {
  const initialState = {
    snackBarMsg: "",
    message: "",
    users: [],
    contactServer: true,
    selectedUser: "",
    names: [],
    showMsg: false,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  console.log("🚀 ~ file: lab13.jsx:27 ~ Lab13 ~ state", state);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      setState({
        contactServer: true,
        snackBarMsg: "Attempting to load users from server...",
        showMsg: true,
      });
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ query: "query { users{name,age,email} }" }),
      });
      let json = await response.json();

      setState({
        snackBarMsg: `${json.data.users.length} users loaded`,
        showMsg: true,
        users: json.data.users,
        contactServer: true,
        message: `${json.data.users.length} users loaded`,

        names: json.data.users.map((a) => a.name),
      });
    } catch (error) {
      console.log(error);
      setState({
        snackBarMsg: `Problem loading server data - ${error.message}`,
        showMsg: true,
      });
    }
  };
  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({
      showMsg: false,
      contactServer: false,
    });
  };
  const onChange = (e, selectedOption) => {
    if (selectedOption) {
      const userObj = state.users.find((u) => u.name === selectedOption);
      setState({
        message: `you selected ${userObj.name}, this user can be contacted at ${userObj.email}`,
      });
    } else {
      setState({ message: `${state.users.length} users loaded` });
    }
  };
  console.log(
    "🚀 ~ file: lab13.jsx:116 ~ Lab13 ~ state.snackBarMsg",
    state.snackBarMsg
  );
  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <CardHeader
          title="Lab13 - search for user"
          color="inherit"
          style={{ textAlign: "center" }}
        />
        <CardContent>
          <Autocomplete
            id="users"
            options={state.names}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="pick a name"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <p />
          <Typography variant="h6" color="error">
            {state.message}
          </Typography>
        </CardContent>
      </Card>
      <Snackbar
        open={state.showMsg}
        message={state.snackBarMsg}
        autoHideDuration={4000}
        onClose={snackbarClose}
      />
    </ThemeProvider>
  );
};
export default Lab13;

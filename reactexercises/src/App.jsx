import { QueryClient, QueryClientProvider } from "react-query";
import ReactQueryExample from "./week8/reactqueryexample";
import React, { useReducer, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./week7/theme";
import {
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Snackbar,
} from "@mui/material";
import MaterialUIEx3Component from "./week7/class1/materialuiexample3";
import MaterialUIEx5Component from "./week7/class2/materialuiexample5";
import MaterialUIEx6Component from "./week7/class2/materialuiexample6";
import MaterialUIEx7a from "./week7/class2/materialuiexample7a";
import Lab13 from "./week7/lab13";
import HomePage from "./lab14/HomePage";
import AlertComponent from "./lab14/AlertComponent";
import AddAdvisory from "./lab14/AddAdvisory";
import ListAdvisories from "./lab14/ListAdvisories";
const queryClient = new QueryClient();
const App = () => {
  const initialState = {
    snackBarMsg: "",
    showMsg: false,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setSnackBarState] = useReducer(reducer, initialState);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarState({
      showMsg: false,
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              INFO3139 - Case #1
            </Typography>
            <IconButton
              onClick={handleClick}
              id="menubtn"
              color="inherit"
              style={{ marginLeft: "auto", paddingRight: "1vh" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={NavLink} to="/home" onClick={handleClose}>
                Home
              </MenuItem>
              <MenuItem component={NavLink} to="/alerts" onClick={handleClose}>
                Reset Data
              </MenuItem>
              <MenuItem
                component={NavLink}
                to="/addadvisory"
                onClick={handleClose}
              >
                Add Advisory
              </MenuItem>
              <MenuItem
                component={NavLink}
                to="/listadvisories"
                onClick={handleClose}
              >
                List Advisories
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/alerts"
            element={<AlertComponent setSnackBarState={setSnackBarState} />}
          />
          <Route
            path="/addadvisory"
            element={<AddAdvisory setSnackBarState={setSnackBarState} />}
          />
          <Route
            path="/listadvisories"
            element={<ListAdvisories setSnackBarState={setSnackBarState} />}
          />
          <Route path="/lab13" element={<Lab13 />} />
        </Routes>
        <Snackbar
          open={state.showMsg}
          message={state.snackBarMsg}
          autoHideDuration={4000}
          onClose={snackbarClose}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
export default App;

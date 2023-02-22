import React, { useEffect, useReducer, useState } from "react";
import {
  Autocomplete,
  Card,
  CardHeader,
  CardContent,
  TextField,
  IconButton,
} from "@mui/material";
import "../App.css";
import AddCircle from "@mui/icons-material/AddCircle";
const AddAdvisory = ({ setSnackBarState }) => {
  const initialState = {
    countries: [],
    name: "",
    selectedCountry: "",
    showMsg: false,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchCountries();
  }, []);
  const fetchCountries = async () => {
    try {
      setSnackBarState({
        snackBarMsg: "Attempting to load countries from server...",
        showMsg: true,
      });
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ query: "query { alerts{name,text} }" }),
      });
      let json = await response.json();

      setSnackBarState({
        snackBarMsg: `${json.data.alerts.length} countries loaded`,
        showMsg: true,
      });
      setState({
        countries: json.data.alerts,
        /*  countries: [
          ...new Map(json.data.alerts.map((c) => [c.name, c])).values(),
        ], */
      });
    } catch (error) {
      console.log(error);
      setSnackBarState({
        snackBarMsg: `Problem loading server data - ${error.message}`,
        showMsg: true,
      });
    }
  };

  const onChange = (e, selectedOption) => {
    selectedOption
      ? setState({ selectedCountry: selectedOption })
      : setState({ selectedCountry: "" });
  };

  const onAddClicked = async () => {
    let advisory = {
      name: state.name,
      text: state.countries.find((c) => c.name === state.selectedCountry).text,
      country: state.selectedCountry,
      date: new Date().toLocaleString(),
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      let query = JSON.stringify({
        query: `mutation {addadvisory(name: "${advisory.name}",text: "${advisory.text}", country: "${advisory.country}", date: "${advisory.date}" ) 
{ name, text, country,date }}`,
      });
      //console.log(query);
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: query,
      });
      let json = await response.json();
      setSnackBarState({
        snackBarMsg: `added Advisory on ${json.data.addadvisory.date} `,
        showMsg: true,
      });
      setState({
        name: "",
        selectedCountry: "",
      });
    } catch (error) {
      setSnackBarState({
        snackBarMsg: `${error.message} - Advisory not added`,
        showMsg: true,
      });
    }
  };

  const emptyorundefined =
    state.name === undefined ||
    state.name === "" ||
    state.selectedCountry === undefined ||
    state.selectedCountry === "";
  if (!state.countries) {
    return "Loadind...";
  }
  return (
    <Card className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src="logo.png" width={200} alt="" />
      </div>
      <CardHeader
        title="Lab14 - Add advisory"
        color="inherit"
        style={{ textAlign: "center" }}
      />
      <CardContent>
        <TextField
          id="margin-dense"
          margin="dense"
          value={state.name}
          label="Traveler's name"
          onChange={(e) => setState({ name: e.target.value })}
        />
        <Autocomplete
          id="countries"
          options={state.countries.map((c) => c.name)}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={onChange}
          value={state.selectedCountry}
          renderInput={(params) => (
            <TextField
              {...params}
              label="pick a country"
              id="margin-dense"
              margin="dense"
              variant="outlined"
              value={state.selectedCountry}
              fullWidth
            />
          )}
        />
        <IconButton
          color="secondary"
          style={{ marginTop: 50, float: "right" }}
          onClick={onAddClicked}
          disabled={emptyorundefined}
        >
          <AddCircle fontSize="large" />
        </IconButton>
      </CardContent>
    </Card>
  );
};
export default AddAdvisory;

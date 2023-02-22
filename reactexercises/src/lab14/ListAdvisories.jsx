import {
  Autocomplete,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useReducer } from "react";
import TableData from "./TableData";

function ListAdvisories({ setSnackBarState }) {
  const initialState = {
    advisories: [],
    name: "",
    type: "",
    data: [],
    checked: "advisories",
    selectedItem: "",
    showMsg: false,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  console.log(
    "🚀 ~ file: ListAdvisories.jsx:27 ~ ListAdvisories ~ state:",
    state
  );

  useEffect(() => {
    fetchAdvisories();
  }, []);
  const fetchData = async (query, type) => {
    try {
      setSnackBarState({
        snackBarMsg: "Attempting to load data from server...",
        showMsg: true,
      });
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ query }),
      });
      let json = await response.json();
      //console.log("🚀 ~ file: ListAdvisories.jsx:44 ~ fetchData ~ json:", json);

      setSnackBarState({
        snackBarMsg: `${json.data[type].length} ${type} loaded`,
        showMsg: type !== "alerts" ? true : false,
      });
      setState({
        //advisories: json.data[type],
        advisories:
          type === "advisories"
            ? [
                ...new Map(json.data[type].map((c) => [c.name, c])).values(),
              ].map((n) => n.name)
            : json.data[type],
      });
    } catch (error) {
      console.log(error);
      setSnackBarState({
        snackBarMsg: `Problem loading server data - ${error.message}`,
        showMsg: true,
      });
    }
  };

  //fetch single item
  const fetchItem = async (query, type) => {
    try {
      setSnackBarState({
        snackBarMsg: "Attempting to load data from server...",
        showMsg: true,
      });
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ query }),
      });
      let json = await response.json();
      console.log("🚀 ~ file: ListAdvisories.jsx:44 ~ fetchData ~ json:", json);

      setSnackBarState({
        snackBarMsg: `${json.data[type].length} ${type} loaded`,
        showMsg: true,
      });
      setState({
        //advisories: json.data[type],

        data: json.data[type],
      });
    } catch (error) {
      console.log(error);
      setSnackBarState({
        snackBarMsg: `Problem loading server data - ${error.message}`,
        showMsg: true,
      });
    }
  };

  const fetchAdvisories = () => {
    setState({
      checked: "travelers",
      data: [],
      selectedItem: "",
    });
    fetchData("query { advisories{name,text,country,date} }", "advisories");
  };
  const fetchRegions = () => {
    setState({
      checked: "region",
      data: [],
      selectedItem: "",
    });
    fetchData("query { regions }", "regions");
  };
  const fetchSubRegions = () => {
    setState({
      checked: "sub-region",
      data: [],
      selectedItem: "",
    });
    fetchData("query { subregions }", "subregions");
  };

  const onChange = (e, selectedOption) => {
    if (selectedOption) {
      setState({ selectedItem: selectedOption });
      releventData(selectedOption);
    } else {
      setState({ selectedItem: "" });
    }
  };

  const releventData = (selectedOption) => {
    let arr = [];
    if (state.checked === "travelers") {
      console.log(
        "🚀 ~ file: ListAdvisories.jsx:136 ~ releventData ~ travelers:",
        "travelers"
      );
      arr = fetchItem(
        `query { advisoryByName(name:"${selectedOption}"){name,text,country,date} }`,
        "advisoryByName"
      );
    }
    if (state.checked === "region") {
      arr = fetchItem(
        `query { alertsforregion(region:"${selectedOption}"){name,text,country,region,date} }`,
        "alertsforregion"
      );
    }
    if (state.checked === "sub-region") {
      arr = fetchItem(
        `query { alertsforsubregion(subregion:"${selectedOption}"){name,text,country,region,date} }`,
        "alertsforsubregion"
      );
    }
    return arr;
  };

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
        title="List advisory by:"
        color="inherit"
        style={{ textAlign: "center" }}
      />
      <CardContent>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              onChange={fetchAdvisories}
              checked={state.checked === "travelers"}
              value="travelers"
              control={<Radio />}
              label="Travelers"
            />
            <FormControlLabel
              onChange={fetchRegions}
              checked={state.checked === "region"}
              value="region"
              control={<Radio />}
              label="Region"
            />
            <FormControlLabel
              onChange={fetchSubRegions}
              checked={state.checked === "sub-region"}
              value="sub-region"
              control={<Radio />}
              label="Sub-Region"
            />
          </RadioGroup>
        </FormControl>
        <Autocomplete
          id="advisories"
          options={state.advisories}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          value={state.selectedItem}
          onChange={onChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label={`pick a ${state.checked}`}
              variant="outlined"
              fullWidth
            />
          )}
        />
        <TableData data={state.data} />
      </CardContent>
    </Card>
  );
}

export default ListAdvisories;

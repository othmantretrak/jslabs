import React, { useState } from "react";
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
} from "@mui/material";
import theme from "./theme";
import "../App.css";
const Lab12 = () => {
  const [message, setMessage] = useState("");
  const [word, setWord] = useState("");
  const onChange = (e, selectedOption) => {
    selectedOption
      ? setMessage(`${message} ${selectedOption}`)
      : setMessage("");
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography>INFO3139 - Lab12</Typography>
        </Toolbar>
      </AppBar>
      <Card className="card">
        <CardHeader
          title="sentence builder using Autocomplete"
          style={{ textAlign: "center" }}
        />
        <CardContent>
          <Autocomplete
            id="words"
            options={words}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="pick a word"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <p />
          <Typography variant="h6" color="error">
            {message}
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
const words = ["Hi", "I", "build", "a", "sentense", "Farah T"];
export default Lab12;

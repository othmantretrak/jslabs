import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Toolbar,
  Card,
  AppBar,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import "../App.css";

import theme from "./theme";
// An example of a React Functional Component using JSX syntax
const Lab11 = () => {
  const [message, setMessage] = useState("");
  const [word, setWord] = useState("");
  return (
    <ThemeProvider theme={theme}>
      <AppBar color="secondary" style={{ marginBottom: "5vh" }}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            INFO3139 - Lab11
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className="card">
        <CardHeader title="Sentence Builder" />
        <CardContent>The message is:</CardContent>
        <CardContent>{message}</CardContent>
        <div style={{ display: "flex", gap: 5 }}>
          <TextField
            onChange={(e) => setWord(e.target.value)}
            placeholder="Add Word"
            id="outlined-basic"
            label="Word"
            value={word}
            variant="outlined"
          />
          <Button
            onClick={() => {
              setMessage(message + " " + word);
              setWord("");
            }}
            data-testid="addbutton"
            variant="contained"
          >
            Submit
          </Button>
          <Button onClick={() => setMessage("")} variant="outlined">
            Clear msg
          </Button>
        </div>
      </Card>
    </ThemeProvider>
  );
};
export default Lab11;

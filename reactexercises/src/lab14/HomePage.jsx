import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../week7/theme";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import "../App.css";
const HomePage = () => {
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
      <CardHeader color="inherit" style={{ textAlign: "center" }} />
      <CardContent>
        <br />
        <Typography
          color="primary"
          style={{ float: "right", paddingRight: "1vh", fontSize: "smaller" }}
        >
          &copy;Info3139 - 2023
        </Typography>
      </CardContent>
    </Card>
  );
};
export default HomePage;

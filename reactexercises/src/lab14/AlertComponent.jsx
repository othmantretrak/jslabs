import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";

function AlertComponent({ setSnackBarState }) {
  const [alerts, setAlerts] = useState("");
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      setSnackBarState({
        snackBarMsg: "running setup",
        showMsg: true,
      });
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ query: "query{project1_setup{results} }" }),
      });
      let json = await response.json();
      setAlerts(json.data.project1_setup.results);
      setSnackBarState({
        snackBarMsg: "alerts collection setup completed",
        showMsg: true,
        //alerts: json.data.project1_setup.results,
      });
    } catch (error) {
      console.log(error);
      setSnackBarState({
        snackBarMsg: `Problem loading server data - ${error.message}`,
        showMsg: true,
      });
    }
  };

  return (
    <div>
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
          title="Lab14 - Alert Setup - Details"
          color="inherit"
          style={{ textAlign: "center" }}
        />
        <CardContent>
          <List>
            {alerts.split(".").map((str) => (
              <ListItem key={str}>
                <ListItemText primary={`${str}.`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

export default AlertComponent;

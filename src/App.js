import React from "react";
import { Card, CardContent } from "@mui/material";
import { Provider } from "react-redux";
import { Routing } from "./components/Routing";
import { configStore } from "./State/store/configStore";

function App() {
  const mystore=configStore();
  return (
    <Provider store={mystore}>
      <Card>
        <CardContent>
          <Routing />
        </CardContent>
      </Card>
    </Provider>
  );
}

export default App;

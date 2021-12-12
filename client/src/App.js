import React from "react";
import { Container } from "@material-ui/core";
import useStyles from "./styles";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Chu from "./Chu";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Auth" element={<Auth />} />
            <Route path="/Chu" element={<Chu />} />
          </Routes>
        </div>
      </Container>
    </BrowserRouter>
  );
};
export default App;

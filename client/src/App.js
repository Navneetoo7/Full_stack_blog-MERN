import React from 'react';
import { Container } from '@material-ui/core';
// import useStyles from "./styles";
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
// import Chu from "./Chu";

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <div>
          <Routes>
            <Route exact path="/" element={<Navigate to="/posts" />} />
            <Route exact path="/posts" element={<Home />} />
            <Route exact path="/posts/search" element={<Home />} />
            <Route exat path="/posts/:id" element={<PostDetails />} />
            <Route
              path="/auth"
              element={!user ? <Auth /> : <Navigate to="/posts" />}
            />
          </Routes>
        </div>
      </Container>
    </BrowserRouter>
  );
};
export default App;

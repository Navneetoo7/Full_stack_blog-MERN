import React, { useEffect, useState } from "react";
import { getPosts } from "../../actions/posts";
import useStyles from "./styles";
import {
  Container,
  Typography,
  Grid,
  Grow,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import Pagination from "../Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const [currentId, setCurrentId] = useState("create");
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useQuery();
  const history = useNavigate();
  const page = query.get("page");
  const searchQuery = query.get("searchQuery");
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <AppBar
              className={classes.AppBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value="TEST"
                onChange={() => {}}
              />
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;

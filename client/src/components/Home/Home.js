import React, { useEffect, useState } from "react";
import { getPosts } from "../../actions/posts";
import useStyles from "./styles";
import { Container, Typography, Grid, Grow } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
const Home = () => {
  const [currentId, setCurrentId] = useState("create");
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid
          className={classes.mainContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;

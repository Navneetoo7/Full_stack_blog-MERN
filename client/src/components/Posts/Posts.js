import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import Post from "./Post/Post";
import useStyles from "./styles";
const Posts = ({ currentId, setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  console.log(
    "useSelector((state) => state.posts)",
    useSelector((state) => state)
  );
  useEffect(() => {
    // if (post) {
    //   return true;
    // }
  }, [posts]);

  return !posts.length ? (
    posts.length === 0 ? (
      <Typography variant="h5" color="secondary">
        No Post there Today For You Or Please Create One{" "}
      </Typography>
    ) : (
      <CircularProgress />
    )
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid
          key={post._id}
          item
          xs={12}
          sm={6}
          alignItems="stretch"
          spacing={3}
        >
          <Post post={post} currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};
export default Posts;

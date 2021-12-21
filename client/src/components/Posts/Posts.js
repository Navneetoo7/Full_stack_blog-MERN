import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import Post from "./Post/Post";
import useStyles from "./styles";
const Posts = ({ currentId, setCurrentId }) => {
  let postsData = useSelector((state) => state.posts);
  const classes = useStyles();
  console.log(
    "useSelector((state) => state.posts)",
    // useSelector((state) => state),
    postsData.length
  );
  console.log("daat worked posts");

  return !postsData.length ? (
    postsData.length === 0 ? (
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
      {postsData.map((post) => (
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

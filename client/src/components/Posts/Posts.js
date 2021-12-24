import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import Post from "./Post/Post";
import useStyles from "./styles";
const Posts = ({ currentId, setCurrentId }) => {
  //[]-> {posts:[]}now
  // let postsData = useSelector((state) => state.posts);
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();
  if (!posts.length && !isLoading) return "No post";
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};
export default Posts;

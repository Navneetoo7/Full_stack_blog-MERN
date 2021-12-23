import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import Post from "./Post/Post";
import useStyles from "./styles";
const Posts = ({ currentId, setCurrentId }) => {
  //[]-> {posts:[]}now
  // let postsData = useSelector((state) => state.posts);
  const { posts } = useSelector((state) => state.posts);
  const classes = useStyles();
  console.log("daat worked posts", posts);

  return !posts ? (
    // (
    //   postsData.length === 0 ? (
    //     <Typography variant="h5" color="secondary">
    //       No Post there Today For You Or Please Create One{" "}
    //     </Typography>
    //   ) :
    <CircularProgress />
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
          sm={12}
          md={6}
          lg={3}
          alignItems="stretch"
        >
          <Post post={post} currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};
export default Posts;

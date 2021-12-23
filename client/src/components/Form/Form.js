import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost, getPosts } from "../../actions/posts";
import { useLocation } from "react-router-dom";

//get the current post id for update
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const [postI, setPostI] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("profile"));

  const post = useSelector((state) =>
    currentId
      ? state.posts?.posts?.find((message) => message._id === currentId)
      : null
  );
  useEffect(() => {
    if (post) setPostData(post);
    console.log("daat worked form");
  }, [post, location]);

  console.log("postpostpostpost ", post);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId == "create") {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      console.log("createPost createPost-----");
      clear();
    } else {
      console.log("updatePostupdatePostupdatePost-----");
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  const getFiles = (files) => {
    setPostData({ ...postData, selectedFile: files.base64 });
  };

  const clear = () => {
    setCurrentId("create");
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  if (!user?.result?.name) {
    return (
      <paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own momories and like other's memories.
        </Typography>
      </paper>
    );
  }
  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root}${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId == "create" ? "Creating" : "Editing"} a Memory
        </Typography>
        {/* <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          className={classes.fields}
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        /> */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          className={classes.fields}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          className={[classes.fields, classes.space]}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          className={classes.fields}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value?.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={getFiles.bind(this)} />
        </div>
        {console.log(postData)}
        <Button
          className={classes.buttonSubmit}
          color="primary"
          variant="contained"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          color="secondary"
          variant="contained"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};
export default Form;

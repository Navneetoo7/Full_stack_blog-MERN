import React, { useEffect, useRef, useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import {commentPost} from "../../actions/posts"

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const commentsRef = useRef();
const user = JSON.parse(localStorage.getItem('profile'));
const dispatch =useDispatch()
  const handleClick = async () => {
const finalComment = `${user.result.name}:${comment}`
const newComment = await dispatch(commentPost(finalComment, post._id))
setComments(newComment);
setComment('');
commentsRef.current.scrollIntoView({behavior:'smooth'})
};
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle2">
              <strong>{c.split(':')[0]}</strong> {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef}/>
        </div>
        {user?.result?.name &&(
      <div style={{ width: "70%" }}>
      <Typography variant="h6" gutterBottom>
        Write a Comment
      </Typography>
      <TextField
        fullWidth
        rows={4}
        label="Comment"
        multiline
        variant="outlined"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        style={{ marginTop: "10px" }}
        fullWidth
        disabled={!comment}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        comment
      </Button>
    </div>
        )}
      </div>
    </div>
  );
};
export default CommentSection;

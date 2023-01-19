import React, { useContext } from "react";

import AuthContext from "../context/auth-context";
import PostHeader from "./LayOut/PostHeader";
import PostFooter from "./LayOut/PostFooter";

import classes from "./Post.module.css";

const Post = (props) => {
  const authCtx = useContext(AuthContext);
  const avatar =
    "https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg";

  return (
    <div className={classes.post}>
      <PostHeader />
      <main className={classes.main}>
        <div className={classes["user-details"]}>
          <div className={classes.avatar}>
            <img src={avatar} alt="the users personalized avatar" />
          </div>
          <p className={classes.userName}>{authCtx.username}</p>
        </div>

        <div className={classes.text}>{props.post.text}</div>
      </main>

      <PostFooter threadId={props.post.threadId} />
    </div>
  );
};

export default Post;

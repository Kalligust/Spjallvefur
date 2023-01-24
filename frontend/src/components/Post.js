import React, { useContext } from "react";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";

import AuthContext from "../context/auth-context";
import PostHeader from "./LayOut/PostHeader";
import PostFooter from "./LayOut/PostFooter";

import classes from "./Post.module.css";

const Post = (props) => {
  const authCtx = useContext(AuthContext);
  const avatar =
    "https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg";

  const textObject = JSON.parse(props.post.text);
  const textContentState = convertFromRaw(textObject);
  const textAsHtml = stateToHTML(textContentState);

  return (
    <div className={classes.post}>
      <PostHeader />
      <div className={classes.main}>
        <div className={classes["user-details"]}>
          <div className={classes.avatar}>
            <img src={avatar} alt="the users personalized avatar" />
          </div>
          {/* <p className={classes.userName}>{authCtx.username}</p> */}
          <p className={classes.userName}>{props.post.username}</p>
        </div>

        <div
          className={classes.text}
          dangerouslySetInnerHTML={{ __html: textAsHtml }}
        ></div>
      </div>

      <PostFooter
        postId={props.post.postId}
        threadId={props.post.threadId}
        username={props.post.username}
      />
    </div>
  );
};

export default Post;

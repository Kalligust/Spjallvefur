import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/auth-context";

import classes from "./PostFooter.module.css";

const PostFooter = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <div className={classes.postfooter}>
      {/* Only show reply button if user is logged in */}
      {authCtx.isLoggedIn && (
        <Link to={`/createreply/${props.threadId}`}>
          <button className={classes["faux-button"]}>Reply</button>
        </Link>
      )}
      {authCtx.username === props.username && (
        <Link
          to={`/editpost?postId=${props.postId}&threadId=${props.threadId}`}
        >
          <button className={classes["faux-button"]}>Edit</button>
        </Link>
      )}
    </div>
  );
};

export default PostFooter;

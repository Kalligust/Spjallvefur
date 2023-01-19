import React, { useContext } from "react";

import AuthContext from "../../context/auth-context";
import classes from "./PostHeader.module.css";

const PostHeader = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div className={classes.postheader}>
      <p>{authCtx.datePosted}</p>
    </div>
  );
};

export default PostHeader;

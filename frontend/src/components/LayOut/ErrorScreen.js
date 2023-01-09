import React from "react";

import classes from "./ErrorScreen.module.css";

const ErrorScreen = (props) => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Error</h1>
      <p className={classes.description}>{props.message}</p>
    </div>
  );
};

export default ErrorScreen;

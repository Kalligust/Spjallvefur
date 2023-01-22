import React from "react";

import classes from "./ToolbarButton.module.css";

const ToolbarButton = (props) => {
  const buttonClass = props.active ? "wrapper-active" : "wrapper";
  return (
    <div
      className={classes[buttonClass]}
      onMouseDown={props.function}
      data-style={props.style}
    >
      {React.createElement(props.icon)}
    </div>
  );
};

export default ToolbarButton;

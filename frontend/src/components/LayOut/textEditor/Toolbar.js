import React from "react";

import ToolbarButton from "./ToolbarButton";
import { inlineStyles, blockTypes } from "../../../toolbarOptions";

import classes from "./Toolbar.module.css";

const Toolbar = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className={classes.toolbarWrapper}>
      <div className={classes.controls}>
        {inlineStyles.map((type) => (
          <ToolbarButton
            key={type.id}
            value={type.value}
            style={type.style}
            icon={type.icon}
            active={currentStyle.has(type.style)}
            function={props.toggleInlineStyle}
          />
        ))}
      </div>
      <div className={classes.controls}>
        {blockTypes.map((type) => (
          <ToolbarButton
            key={type.id}
            value={type.value}
            style={type.block}
            icon={type.icon}
            active={type.block === blockType}
            function={props.toggleBlockType}
          />
        ))}
      </div>
    </div>
  );
};

export default Toolbar;

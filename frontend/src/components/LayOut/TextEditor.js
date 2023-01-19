import React from "react";
import { Editor, EditorState, RichUtils, RawDraftContentBlock } from "draft-js";

const TextEditor = () => {
  return (
    <div className={classes.wrapper}>
      <h1> create reply</h1>
      <div className={classes.Draftwrapper}>
        <input
          type="button"
          value="Italic"
          data-style="ITALIC"
          onMouseDown={toggleInlineStyle}
        />
        <input
          type="button"
          value="Bold"
          data-style="BOLD"
          onMouseDown={toggleInlineStyle}
        />
        <input
          type="button"
          value="Code"
          data-style="CODE"
          onMouseDown={toggleInlineStyle}
        />
        <input
          type="button"
          value="StrikeThrough"
          data-style="STRIKETHROUGH"
          onMouseDown={toggleInlineStyle}
        />
        <input
          type="button"
          value="Underline"
          data-style="UNDERLINE"
          onMouseDown={toggleInlineStyle}
        />
        <form onSubmit={submitHandler}>
          <Editor editorState={editorState} onChange={onEditorStateChange} />
          <button type="submit"> submit</button>
        </form>
      </div>
    </div>
  );
};

export default TextEditor;

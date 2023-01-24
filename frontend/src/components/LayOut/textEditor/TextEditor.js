import { useState, useRef, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

import Footer from "./Footer";
import Toolbar from "./Toolbar";
import myBlockStyleFn from "./myBlockStyleFn";

import classes from "./TextEditor.module.css";
import "./myBlockStyleFn.css";

const TextEditor = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const titleRef = useRef("");

  useEffect(() => {
    console.log(props.contentString);
    if (props.editMode && props.contentString !== "") {
      console.log(props.contentString);
      const rawContentState = JSON.parse(props.contentString);
      console.log(rawContentState);
      const contentState = convertFromRaw(rawContentState);
      const placeHolder = EditorState.createWithContent(contentState);
      setEditorState(placeHolder);
    }
  }, []);

  let domEditor = null;

  const setDomEditorRef = (ref) => {
    domEditor = ref;
  };

  const focus = () => {
    domEditor.focus();
  };

  const onEditorStateChange = (changedState) => {
    setEditorState(changedState);
  };

  const toggleInlineStyle = (event) => {
    event.preventDefault();
    let style = event.currentTarget.getAttribute("data-style");
    onEditorStateChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (event) => {
    event.preventDefault();
    let block = event.currentTarget.getAttribute("data-style");
    onEditorStateChange(RichUtils.toggleBlockType(editorState, block));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const content = {
      title: titleRef.current.value,
      text: JSON.stringify(rawContentState),
    };
    props.submitHandler(content);
  };

  return (
    <div className={classes["daddy-wrapper"]}>
      <form className={classes["editor-form"]} onSubmit={submitHandler}>
        <div className={classes["editor-wrapper"]}>
          <Toolbar
            toggleInlineStyle={toggleInlineStyle}
            toggleBlockType={toggleBlockType}
            editorState={editorState}
          />
          {props.originalPost && (
            <div className={classes["title-wrapper"]}>
              <label className={classes.titleLabel} htmlFor="title">
                Thread Title
              </label>
              <input
                className={classes["thread-title"]}
                type="text"
                ref={titleRef}
                id="title"
              />
            </div>
          )}
          <div className={classes["textSection"]} onClick={focus}>
            <Editor
              editorState={editorState}
              onChange={onEditorStateChange}
              ref={setDomEditorRef}
              // customStyleMap={styleMap}
              blockStyleFn={myBlockStyleFn}
            />
          </div>
          <Footer />
        </div>
      </form>
    </div>
  );
};

export default TextEditor;

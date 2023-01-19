import React from "react";
import { useRef, useState, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";

import { Editor, EditorState, RichUtils, RawDraftContentBlock } from "draft-js";

import ErrorScreen from "../components/LayOut/ErrorScreen";
import AuthContext from "../context/auth-context";
import useHttp from "../hooks/use-http";
import classes from "./CreateReply.module.css";

const CreateReply = () => {
  const textRef = useRef("");
  const sendRequest = useHttp();
  const { id } = useParams();
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(null);
  const threadUrl = `/threads/${id}`;
  const authCtx = useContext(AuthContext);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const URL = process.env.REACT_APP_SERVER_URL;

  // If user is not logged in redirect to signin page
  // if (!authCtx.isLoggedIn) {
  //   return <Redirect to={"/signin"} />;
  // }

  const processData = (data) => {
    setSubmit(true);
  };

  const errorHandler = (e) => {
    setError(e.message);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(editorState);
    // console.log(convertToRaw(editorState.getCurrentContent()));
    // event.preventDefault();
    // const text = textRef.current.value;
    // if (text !== "") {
    //   const body = {
    //     threadId: id,
    //     text: text,
    //     username: authCtx.username,
    //     userId: authCtx.userId,
    //     token: authCtx.token,
    //   };
    //   sendRequest(
    //     {
    //       url: `${URL}/createReply/${id}`,
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: body,
    //     },
    //     processData,
    //     errorHandler
    //   );
    // }
  };

  const onEditorStateChange = (changedState) => {
    setEditorState(changedState);
  };

  const toggleInlineStyle = (event) => {
    event.preventDefault();
    let style = event.currentTarget.getAttribute("data-style");
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return !submit ? (
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
  ) : (
    <Redirect to={threadUrl} />
  );
};

export default CreateReply;

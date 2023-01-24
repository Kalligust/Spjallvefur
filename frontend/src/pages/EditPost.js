import React from "react";
import { useState, useContext, useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";

import ErrorScreen from "../components/LayOut/ErrorScreen";
import AuthContext from "../context/auth-context";
import useHttp from "../hooks/use-http";
import TextEditor from "../components/LayOut/textEditor/TextEditor";

const EditPost = () => {
  const sendRequest = useHttp();
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  const authCtx = useContext(AuthContext);

  const location = useLocation().search;
  const postId = new URLSearchParams(location).get("postId");
  const threadId = new URLSearchParams(location).get("threadId");
  const threadUrl = `/threads/${threadId}`;
  const URL = process.env.REACT_APP_SERVER_URL;

  // If user is not logged in redirect to signin page
  // if (!authCtx.isLoggedIn) {
  //   return <Redirect to={"/signin"} />;
  // }

  useEffect(() => {
    sendRequest(
      { url: `${URL}/getPostFromId?postId=${postId}` },
      onSuccessfullGet,
      errorHandler
    );
  }, []);

  if (error) {
    return <ErrorScreen message={error} />;
  }

  const onSuccessfullGet = (data) => {
    console.log("onget");
    console.log(data.text);
    setPost(data.text);
  };

  const onSuccessfullPost = (data) => {
    setSubmit(true);
  };

  const errorHandler = (e) => {
    setError(e.message);
  };

  const submitHandler = (content) => {
    const body = {
      postId: postId,
      threadId: threadId,
      text: content.text,
      username: authCtx.username,
      userId: authCtx.userId,
      token: authCtx.token,
    };
    sendRequest(
      {
        url: `${URL}/editPost`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      },
      onSuccessfullPost,
      errorHandler
    );
  };

  return !submit ? (
    <React.Fragment>
      {post && (
        <TextEditor
          originalPost={false}
          editMode={true}
          contentString={post}
          submitHandler={submitHandler}
        />
      )}
    </React.Fragment>
  ) : (
    <Redirect to={threadUrl} />
  );
};

export default EditPost;

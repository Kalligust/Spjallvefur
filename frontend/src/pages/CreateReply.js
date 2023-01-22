import React from "react";
import { useState, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";

import ErrorScreen from "../components/LayOut/ErrorScreen";
import AuthContext from "../context/auth-context";
import useHttp from "../hooks/use-http";
import TextEditor from "../components/LayOut/textEditor/TextEditor";

const CreateReply = () => {
  const sendRequest = useHttp();
  const { id } = useParams();
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(null);
  const threadUrl = `/threads/${id}`;
  const authCtx = useContext(AuthContext);

  const URL = process.env.REACT_APP_SERVER_URL;

  // If user is not logged in redirect to signin page
  // if (!authCtx.isLoggedIn) {
  //   return <Redirect to={"/signin"} />;
  // }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  const processData = (data) => {
    setSubmit(true);
  };

  const errorHandler = (e) => {
    setError(e.message);
  };

  const submitHandler = (content) => {
    const body = {
      threadId: id,
      text: content.text,
      username: authCtx.username,
      userId: authCtx.userId,
      token: authCtx.token,
    };
    sendRequest(
      {
        url: `${URL}/createReply/${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      },
      processData,
      errorHandler
    );
  };

  return !submit ? (
    <React.Fragment>
      <TextEditor originalPost={false} submitHandler={submitHandler} />
    </React.Fragment>
  ) : (
    <Redirect to={threadUrl} />
  );
};

export default CreateReply;

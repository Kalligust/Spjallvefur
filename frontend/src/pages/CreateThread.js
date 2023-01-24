import React from "react";
import { useContext } from "react";
import { Redirect } from "react-router-dom";

import AuthContext from "../context/auth-context";
import useHttp from "../hooks/use-http";
import TextEditor from "../components/LayOut/textEditor/TextEditor";

const CreateThread = () => {
  const sendRequest = useHttp();
  const authCtx = useContext(AuthContext);

  const URL = process.env.REACT_APP_SERVER_URL;

  //If user is not logged in he gets redirected to log in page
  // if (!authCtx.isLoggedIn) {
  //   return <Redirect to={"/signin"} />;
  // }

  const processData = (data) => {
    const threadId = data.threadId;
  };

  const errorHandler = () => {};

  const submitHandler = (content) => {
    const body = {
      title: content.title,
      text: content.text,
      username: authCtx.username,
      userId: authCtx.userId,
      token: authCtx.token,
    };
    sendRequest(
      {
        url: `${URL}/createThread`,
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

  return (
    <React.Fragment>
      <TextEditor originalPost={true} submitHandler={submitHandler} />
    </React.Fragment>
  );
};

export default CreateThread;

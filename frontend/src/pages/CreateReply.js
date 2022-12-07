import React from "react";
import { useRef, useState, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
import useHttp from "../hooks/use-http";
import classes from "./CreateReply.module.css";

const CreateReply = () => {
  const textRef = useRef();
  const sendRequest = useHttp();
  const { id } = useParams();
  const [submit, setSubmit] = useState(false);
  const threadUrl = `/threads/${id}`;
  const authCtx = useContext(AuthContext);

  const URL = process.env.REACT_APP_SERVER_URL;

  //If user is not logged in redirect to signin page
  if (!authCtx.isLoggedIn) {
    return <Redirect to={"/signin"} />;
  }

  const processData = (data) => {
    setSubmit(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const text = textRef.current.value;
    if (text !== "") {
      const body = {
        threadId: id,
        text: text,
        username: authCtx.username,
        userId: authCtx.userId,
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
        processData
      );
    }
  };

  return !submit ? (
    <div className={classes.wrap}>
      <form className={classes.post} onSubmit={submitHandler}>
        <textarea type="text" ref={textRef}></textarea>
        <button type="submit">Post</button>
      </form>
    </div>
  ) : (
    <Redirect to={threadUrl} />
  );
};

export default CreateReply;

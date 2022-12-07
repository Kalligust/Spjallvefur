import React from "react";
import { useRef, useContext } from "react";
import { Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
import useHttp from "../hooks/use-http";
import classes from "./CreateThread.module.css";

const CreateThread = () => {
  const textRef = useRef();
  const titleRef = useRef();
  const [sendRequest, isError, error] = useHttp();
  const authCtx = useContext(AuthContext);

  const URL = process.env.REACT_APP_BASE_URL;

  //If user is not logged in he gets redirected to log in page
  if (!authCtx.isLoggedIn) {
    return <Redirect to={"/signin"} />;
  }

  //VANTAR ALLT ERROR HANDLING
  const processData = (data) => {
    console.log(isError);
    if (isError) {
      console.log(error);
    }
    console.log(`Thread with id  "${data.threadId}" created`);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const title = titleRef.current.value;
    const text = textRef.current.value;
    if (text !== "") {
      const body = {
        title: title,
        text: text,
        username: authCtx.username,
        userId: authCtx.userId,
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
        processData
      );
    }
  };

  return (
    <div className={classes.wrap}>
      <form className={classes.post} onSubmit={submitHandler}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef}></input>
        <textarea type="text" ref={textRef}></textarea>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreateThread;

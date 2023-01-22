import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import ErrorScreen from "../components/LayOut/ErrorScreen";
import useInputValidation from "../hooks/use-inputValidation";
import useHttp from "../hooks/use-http";
import AuthContext from "../context/auth-context";

import classes from "./SignUp.module.css";

const SignIn = () => {
  const sendRequest = useHttp();
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);

  const URL = process.env.REACT_APP_SERVER_URL;

  const {
    input: typedName,
    markAsInvalid: markNameAsInvalid,
    inputChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHandler,
    inputClass: nameInputClass,
  } = useInputValidation((i) => i !== "");

  const {
    input: typedPassword,
    markAsInvalid: markPasswordAsInvalid,
    inputChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
    inputClass: passwordInputClass,
  } = useInputValidation((i) => i !== "");

  if (authCtx.isLoggedIn) {
    return <Redirect to="/" />;
  }

  const processData = (data) => {
    authCtx.login(data.username, data.userId, data.token);
  };

  const errorHandler = (e) => {
    console.log(e.message);
    setError(e.message);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!markNameAsInvalid && !markPasswordAsInvalid) {
      const body = {
        username: typedName,
        password: typedPassword,
      };
      sendRequest(
        {
          url: `${URL}/signin`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        },
        processData,
        errorHandler
      );
    }
  };

  return (
    <div className={classes["signup-wrapper"]}>
      {!!error && <ErrorScreen message={error} />}
      <h1>Sign in</h1>
      <form className={classes["signup-form"]} onSubmit={submitHandler}>
        <div className={classes.input}>
          <label htmlFor="new-username">Username</label>
          <input
            className={classes[nameInputClass]}
            id="new-username"
            type="text"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          ></input>
        </div>
        <div className={classes.input}>
          <label htmlFor="password">Password</label>
          <input
            className={classes[passwordInputClass]}
            type="text"
            id="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          ></input>
        </div>
        <button className={classes["faux-button"]} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignIn;

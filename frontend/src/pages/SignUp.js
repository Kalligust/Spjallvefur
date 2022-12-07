import { useContext } from "react";

import useInputValidation from "../hooks/use-inputValidation";
import useHttp from "../hooks/use-http";
import { AuthContext } from "../context/auth-context";

import classes from "./SignUp.module.css";

const SignUp = () => {
  const authCtx = useContext(AuthContext);
  const [sendRequest, isError, error] = useHttp();

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

  const formatData = (data) => {
    authCtx.login(data.username, data.userId, data.token);
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
          url: `${URL}/signup`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        },
        formatData
      );
    }
  };

  return (
    <div className={classes["signup-wrapper"]}>
      <h1>Sign Up</h1>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;

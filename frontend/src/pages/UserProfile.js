import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";

import useHttp from "../hooks/use-http";

import classes from "./UserProfile.module.css";

const avatar =
  "https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg";

const UserProfile = () => {
  const sendRequest = useHttp();
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState();
  const [error, setError] = useState();

  const URL = process.env.REACT_APP_SERVER_URL;
  const location = useLocation().search;
  const username = new URLSearchParams(location).get("username");

  useEffect(() => {
    sendRequest(
      { url: `${URL}/getUserByUsername?username=${username}` },
      onSuccessfullGet,
      errorHandler
    );
  }, []);

  const onSuccessfullGet = (data) => {
    console.log(data);
    setUser(data);
    setFetching(false);
  };

  const errorHandler = (err) => {
    console.log(error);
    setError(err);
  };

  if (fetching) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.sidebar}>
        <h2>{user.username}</h2>
        <div className={classes["avatar-wrapper"]}>
          <img className={classes.avatar} src={avatar} alt="users avatar" />
        </div>
      </div>
      <div className={classes.userInfo}>
        <table>
          <tbody>
            <tr>
              <td>Age :</td>
              <td>insert age years old</td>
            </tr>
            <tr>
              <td>Location :</td>
              <td>Insert Location</td>
            </tr>
            <tr>
              <td>Occupation :</td>
              <td>Insert occupation</td>
            </tr>
          </tbody>
        </table>
        <div className={classes.about}>
          <h2>About me</h2>
          <p className={classes.description}>
            bææalbla,blabla,basdkgsobnlsjdfbnadfkjgnadfkk nfkadgn kadfvka jadfn
            lkdfj kldf kdjfj lakdfjbvlkdf j
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

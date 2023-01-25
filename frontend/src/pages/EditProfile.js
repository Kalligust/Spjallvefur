import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";

import useHttp from "../hooks/use-http";
import AuthContext from "../context/auth-context";

import classes from "./EditProfile.module.css";

//BRÁÐABIRGÐAMYND EYÐA
const avatar =
  "https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg";

const EditProfile = () => {
  const sendRequest = useHttp();
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [isChangingAvatar, setIsChangingAvatar] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);
  const { nameRef, birthdayRef, locationRef, occupationRef, aboutRef } =
    useRef("");
  const authCtx = useContext(AuthContext);

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
    setUser(data);
    setFetching(false);
  };

  const onSuccessFullPost = (data) => {
    console.log(data);
  };

  const errorHandler = (err) => {
    console.log(error);
    setError(err);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(nameRef.current);
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("username", nameRef.current);
    formData.append("birthday", birthdayRef.current);
    formData.append("location", locationRef.current);
    formData.append("about", aboutRef.current);
    const body = {
      username: nameRef,
      birthday: birthdayRef,
      location: locationRef,
      occpation: occupationRef,
      about: aboutRef,
      avatar: newAvatar,
    };
    console.log(body);
    sendRequest(
      {
        url: `URL/editUser?username=${authCtx.username}`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
      body,
      onSuccessFullPost,
      errorHandler
    );
  };

  const changeAvatarHandler = () => {
    setIsChangingAvatar(true);
  };

  const onSelectFile = (event) => {
    setNewAvatar(event.target.files[0]);
  };

  // const avatarUploadHandler = () => {
  //   const formData = new FormData();
  //   formData.append("new avatar", newAvatar);
  // };

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
        <div
          className={classes["avatar-wrapper"]}
          onClick={changeAvatarHandler}
        >
          <img className={classes.avatar} src={avatar} alt="users avatar" />
          <div className={classes.overlay}>
            <p>Change avatar</p>
          </div>
        </div>
        {isChangingAvatar && (
          <div className={classes["img-upload"]}>
            <input
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              onChange={onSelectFile}
            ></input>
            {/* <div
              className={classes["faux-button"]}
              onClick={avatarUploadHandler}
            >
              Upload image
            </div> */}
          </div>
        )}
      </div>
      <div className={classes.userInfo}>
        <form onSubmit={submitHandler}>
          <div className={classes["input-wrapper"]}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" ref={nameRef} />
          </div>
          <div className={classes["input-wrapper"]}>
            <label htmlFor="birthday">Birthday</label>
            <input type="date" id="birthday" ref={birthdayRef} />
          </div>
          <div className={classes["input-wrapper"]}>
            <label htmlFor="location">Location</label>
            <input type="text" id="location" ref={locationRef} />
          </div>
          <div className={classes["input-wrapper"]}>
            <label htmlFor="occupation">Occupation</label>
            <input type="text" id="occupation" ref={occupationRef} />
          </div>
          <div className={classes.about}>
            <label htmlFor="about">About</label>
            <input type="textarea" id="about" ref={aboutRef} />
          </div>
          <button type="submit" className={classes["faux-button"]}>
            Edit information
          </button>
        </form>

        <div className={classes["edit-section"]}></div>
      </div>
    </div>
  );
};

export default EditProfile;

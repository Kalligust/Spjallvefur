import React, { useContext, useState, useRef } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";

import ImageUpload from "../components/ImageUpload";
import useHttp from "../hooks/use-http";
import AuthContext from "../context/auth-context";

import classes from "./EditProfile.module.css";

//BRÁÐABIRGÐAMYND EYÐA
const avatar =
  "https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg";

const EditProfile = (props) => {
  const sendRequest = useHttp();
  const [isChangingAvatar, setIsChangingAvatar] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);
  const avatarSelectorRef = useRef();
  const nameRef = useRef(props.username);
  const birthdayRef = useRef();
  const locationRef = useRef(props.location);
  const occupationRef = useRef(props.occupation);
  const aboutRef = useRef(props.about);

  const URL = process.env.REACT_APP_SERVER_URL;
  // const location = useLocation().search;
  // const username = new URLSearchParams(location).get("username");
  // };

  console.log(props.username);

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
    // const formData = new FormData();
    // formData.append("avatar", avatar);
    // formData.append("username", nameRef.current);
    // formData.append("birthday", birthdayRef.current);
    // formData.append("location", locationRef.current);
    // formData.append("about", aboutRef.current);
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
    avatarSelectorRef.current.click();
  };

  const onSuccessFullImageUpload = (data) => {
    console.log(data);
  };

  const onSelectFile = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    sendRequest(
      {
        url: `${URL}/uploadImage`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: image,
      },
      onSuccessFullImageUpload,
      errorHandler
    );
  };

  // const avatarUploadHandler = () => {
  //   const formData = new FormData();
  //   formData.append("new avatar", newAvatar);
  // };

  return (
    <div className={classes.wrapper}>
      <div className={classes.sidebar}>
        <h2>{props.username}</h2>
        <div
          className={classes["avatar-wrapper"]}
          onClick={changeAvatarHandler}
        >
          <img className={classes.avatar} src={avatar} alt="users avatar" />
          <div className={classes.overlay}>
            <p>Change avatar</p>
          </div>
          <ImageUpload ref={avatarSelectorRef} onChange={onSelectFile} />
          {/* <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={onSelectFile}
            style={{ display: "none" }}
            ref={avatarSelectorRef}
          /> */}
        </div>
      </div>
      <div className={classes.userInfo}>
        <form onSubmit={submitHandler}>
          <div className={classes["input-wrapper"]}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              ref={nameRef}
              placeholder={props.username}
            />
          </div>
          <div className={classes["input-wrapper"]}>
            <label htmlFor="birthday">Birthday</label>
            <input type="date" id="birthday" ref={birthdayRef} />
          </div>
          <div className={classes["input-wrapper"]}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              ref={locationRef}
              placeholder={props.location}
            />
          </div>
          <div className={classes["input-wrapper"]}>
            <label htmlFor="occupation">Occupation</label>
            <input
              type="text"
              id="occupation"
              ref={occupationRef}
              placeholder={props.occupation}
            />
          </div>
          <div className={classes.about}>
            <label htmlFor="about">About</label>
            <input
              type="textarea"
              id="about"
              ref={aboutRef}
              placeholder={props.about}
            />
          </div>
          <button type="submit" className={classes["faux-button"]}>
            Submit Changes
          </button>
        </form>

        <div className={classes["edit-section"]}></div>
      </div>
    </div>
  );
};

export default EditProfile;

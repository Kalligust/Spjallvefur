import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ErrorScreen from "../components/LayOut/ErrorScreen";

import Post from "../components/Post";
import useHttp from "../hooks/use-http";
import classes from "./Thread.module.css";

const Thread = (props) => {
  const { id } = useParams();
  const sendRequest = useHttp();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    sendRequest({ url: `${URL}/threads/${id}` }, processData, errorHandler);
  }, []);

  if (error) {
    return (
      <div className={classes.main}>
        <ErrorScreen message={error.message} />
      </div>
    );
  }

  const processData = (data) => {
    setPosts(data);
  };

  const errorHandler = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <div className={classes.thread}>
      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  );
};

export default Thread;

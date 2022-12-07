import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Post from "../components/Post";
import useHttp from "../hooks/use-http";
import classes from "./Thread.module.css";

const Thread = (props) => {
  const { id } = useParams();
  const sendRequest = useHttp();
  const [posts, setPosts] = useState([]);

  const URL = process.env.REACT_APP_BASE_URL;

  const processData = (data) => {
    setPosts(data);
  };

  useEffect(() => {
    sendRequest({ url: `${URL}/threads/${id}` }, processData);
  }, []);

  return (
    <div className={classes.thread}>
      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  );
};

export default Thread;

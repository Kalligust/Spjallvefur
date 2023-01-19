import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ErrorScreen from "../components/LayOut/ErrorScreen";

import ThreadListItem from "../components/ThreadListItem";
import AuthContext from "../context/auth-context";
import useHttp from "../hooks/use-http";
import classes from "./MainPage.module.css";

const MainPage = () => {
  const sendRequest = useHttp();
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);

  const URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    sendRequest({ url: `${URL}/threads` }, processData, errorHandler);
  }, [sendRequest]);

  if (error) {
    return (
      <div className={classes.main}>
        <ErrorScreen message={error.message} />
      </div>
    );
  }

  //Method to process data returned in sendRequest method
  const processData = (data) => {
    setThreads(data || []);
  };

  //Method to handle errors in sendrequest method
  const errorHandler = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <div className={classes.main}>
      <h1>Main page</h1>
      {authCtx.isLoggedIn && (
        <Link to="/createthread" style={{ textDecoration: "none" }}>
          <div className={classes["faux-button"]}>Start New Thread</div>
        </Link>
      )}
      <div className={classes.topics}>
        <ul>
          {threads.map((thread) => (
            <ThreadListItem
              key={thread.id}
              id={thread.threadId}
              title={thread.threadTitle}
              date={thread.date}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainPage;

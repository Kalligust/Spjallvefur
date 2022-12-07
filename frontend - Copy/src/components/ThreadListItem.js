import { Link } from "react-router-dom";

import Thread from "../pages/Thread.js";
import classes from "./ThreadListItem.module.css";

const ThreadListItem = (props) => {
  return (
    <div className={classes["thread-wrapper"]}>
      <Link to={`/threads/${props.id}`} style={{ textDecoration: "none" }}>
        <h2 className={classes.title}>{props.title}</h2>
      </Link>
      <div className={classes.details}>
        <p className={classes.date}>01/12/2022</p>
      </div>
    </div>
  );
};

export default ThreadListItem;

import { Link } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../../context/auth-context";

import classes from "./Header.module.css";

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className={classes.title}>Forum Project</h1>
      </Link>
      <div className={classes.actions}>
        {!authCtx.isLoggedIn && (
          <Link to="/Signup" style={{ textDecoration: "none" }}>
            <div className={classes["faux-button"]}>Sign Up</div>
          </Link>
        )}
        {!authCtx.isLoggedIn && (
          <Link to="/SignIn" style={{ textDecoration: "none" }}>
            <div className={classes["faux-button"]}>Sign In</div>
          </Link>
        )}
        {authCtx.isLoggedIn && (
          <div className={classes["faux-button"]} onClick={authCtx.logout}>
            Log Out
          </div>
        )}
        {authCtx.isLoggedIn && (
          <Link
            to={`/userprofile?username=${authCtx.username}`}
            style={{ textDecoration: "none" }}
          >
            <div className={classes["faux-button"]}>Profile</div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

import React from "react";

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.footerWrapper}>
      <button type="submit" className={classes.submitBtn}>
        Submit
      </button>
    </div>
  );
};

export default Footer;

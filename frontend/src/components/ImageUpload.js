import React, { useImperativeHandle, useRef } from "react";

const ImageUpload = (props) => {
  const imageRef = useRef();

  return (
    <input
      type="file"
      accept="image/jpeg, image/png, image/jpg"
      onChange={props.onSelectFile}
      style={{ display: "none" }}
    />
  );
};

export default ImageUpload;

import React, { useImperativeHandle, useRef } from "react";

const ImageUpload = React.forwardRef((props, ref) => {
  const imageRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      imageRef: imageRef,
    };
  });

  return (
    <input
      type="file"
      accept="image/jpeg, image/png, image/jpg"
      onChange={props.onSelectFile}
      style={{ display: "none" }}
      ref={imageRef}
    />
  );
});

export default ImageUpload;

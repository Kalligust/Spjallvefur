import { EditorState, convertFromRaw } from "draft-js";

export const contentStringToEditorState = (contentString) => {
  const rawContentState = JSON.parse(contentString);
  const contentState = convertFromRaw(rawContentState);
  const placeHolder = EditorState.createWithContent(contentState);

  return placeHolder;
};

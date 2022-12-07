import { useState } from "react";

const useInputValidation = (validationFunction) => {
  const [input, setInput] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);

  const isInputValid = validationFunction(input);
  const markAsInvalid = !isInputValid && isInputTouched;

  if (markAsInvalid) {
    console.log("invalid");
  }

  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  };

  const onBlurHandler = () => {
    setIsInputTouched(true);
  };

  return {
    input,
    isInputTouched,
    markAsInvalid,
    inputChangeHandler,
    onBlurHandler,
    inputClass: markAsInvalid ? "invalidInput" : "validInput",
  };
};

export default useInputValidation;

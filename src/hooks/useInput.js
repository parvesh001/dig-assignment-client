import { useState } from "react";

export default function useInput(checkValidation, initialValue) {
  const [authorInput, setAuthorInput] = useState(initialValue || "");
  const [inputIsTouched, setInputIsTouched] = useState(false);

  const authorInputIsValid = checkValidation(authorInput);
  const hasError = !authorInputIsValid && inputIsTouched;

  const authorInputChangeHandler = (event) => {
    setAuthorInput(event.target.value);
  };
  const authorInputBlurHandler = () => {
    setInputIsTouched(true);
  };

  return {
    authorInput,
    authorInputIsValid,
    hasError,
    authorInputChangeHandler,
    authorInputBlurHandler,
  };
}
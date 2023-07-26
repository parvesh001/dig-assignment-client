import React, { useContext, useState } from "react";
import Input from "../../../UIs/Input";
import useInput from "../../../hooks/useInput";
import Alert from "../../../UIs/Alert";
import "./Register.css";

export default function Registration({ onLogin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  //   const { login } = useContext(AuthContext);

  const {
    authorInput: authorNameInput,
    authorInputIsValid: authorNameInputIsValid,
    hasError: authorNameInputHasError,
    authorInputChangeHandler: authorNameInputChangeHandler,
    authorInputBlurHandler: authorNameInputBlurHandler,
  } = useInput((value) =>
    /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([ '-][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/.test(value)
  );

  const {
    authorInput: authorEmailInput,
    authorInputIsValid: authorEmailInputIsValid,
    hasError: authorEmailInputHasError,
    authorInputChangeHandler: authorEmailInputChangeHandler,
    authorInputBlurHandler: authorEmailInputBlurHandler,
  } = useInput((value) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
  );

  const {
    authorInput: authorPasswordInput,
    authorInputIsValid: authorPasswordInputIsValid,
    hasError: authorPasswordInputHasError,
    authorInputChangeHandler: authorPasswordInputChangeHandler,
    authorInputBlurHandler: authorPasswordInputBlurHandler,
  } = useInput((value) => value.trim().length > 5);

  const {
    authorInput: authorConfirmPasswordInput,
    authorInputIsValid: authorConfirmPasswordInputIsValid,
    hasError: authorConfirmPasswordInputHasError,
    authorInputChangeHandler: authorConfirmPasswordInputChangeHandler,
    authorInputBlurHandler: authorConfirmPasswordInputBlurHandler,
  } = useInput((value) => value === authorPasswordInput);

  let formIsValid = false;
  if (
    authorNameInputIsValid &&
    authorEmailInputIsValid &&
    authorPasswordInputIsValid &&
    authorConfirmPasswordInputIsValid
  ) {
    formIsValid = true;
  }

  const registrationFormSubmitHandler = async (event) => {
    event.preventDefault();
    // if (!formIsValid) return;
    // setIsLoading(true);
    // try {
    //   const data = await sendRegistrationRequest({
    //     endpoint: "authors/register",
    //     method: "POST",
    //     body: JSON.stringify({
    //       name: authorNameInput,
    //       email: authorEmailInput,
    //       password: authorPasswordInput,
    //       confirmPassword: authorConfirmPasswordInput,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   setIsLoading(false);
    //   setAlert({ scenario: "success", message: "Registered successfully" });
    //   setTimeout(() => login(data.author, data.token), 1000);
    // } catch (err) {
    //   setIsLoading(false);
    //   setAlert({ scenario: "error", message: err.message });
    // }
  };

  const nameInputClass = authorNameInputHasError ? "is-invalid" : "";
  const emailInputClass = authorEmailInputHasError ? "is-invalid" : "";
  const passInputClass = authorPasswordInputHasError ? "is-invalid" : "";
  const confirmPassInputClass = authorConfirmPasswordInputHasError
    ? "is-invalid"
    : "";

  return (
    <>
      {alert && (
        <Alert
          scenario={alert.scenario}
          message={alert.message}
          dismiss={() => setAlert(null)}
        />
      )}
      <div className="h-100 d-flex flex-column justify-content-center register-container mx-auto">
        <div className="mb-2 mb-md-3 mb-lg-4">
          <h2 className="text-primary text-center fs-4 fs-md-2">
            Please Register Here
          </h2>
        </div>
        <form className="m-b-3" onSubmit={registrationFormSubmitHandler}>
          <Input
            id="authorName"
            label="Name"
            placeholder="Parvesh"
            type="text"
            value={authorNameInput}
            className={nameInputClass}
            onChange={authorNameInputChangeHandler}
            onBlur={authorNameInputBlurHandler}
            invalidFeedback="Please mention valid name"
          />
          <Input
            id="authorEmail"
            label="Email"
            placeholder="author@gmail.com"
            type="email"
            value={authorEmailInput}
            className={emailInputClass}
            onChange={authorEmailInputChangeHandler}
            onBlur={authorEmailInputBlurHandler}
            invalidFeedback="Please mention valid email"
          />
          <Input
            id="authorPassword"
            label="Password"
            placeholder="*********"
            type="password"
            value={authorPasswordInput}
            className={passInputClass}
            onChange={authorPasswordInputChangeHandler}
            onBlur={authorPasswordInputBlurHandler}
            invalidFeedback="Password must be six characters long"
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
            placeholder="*********"
            type="password"
            value={authorConfirmPasswordInput}
            className={confirmPassInputClass}
            onChange={authorConfirmPasswordInputChangeHandler}
            onBlur={authorConfirmPasswordInputBlurHandler}
            invalidFeedback="Both the passwords must match"
          />

          <button
            className="btn btn-primary"
            type="submit"
            disabled={!formIsValid}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <div>
          <button
            type="button"
            className="btn btn-transparent mx-auto d-block text-secondary"
            onClick={onLogin}
          >
            Login With Existing Account
          </button>
        </div>
      </div>
    </>
  );
}

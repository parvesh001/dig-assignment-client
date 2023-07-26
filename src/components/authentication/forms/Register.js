import React, { useContext, useState } from "react";
import Input from "../../../UIs/Input";
import useInput from "../../../hooks/useInput";
import Alert from "../../../UIs/Alert";
import "./Register.css";
import { AuthContext } from "../../../context/authContext";

export default function Registration({ onLogin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const { login } = useContext(AuthContext);

  const {
    userInput: userNameInput,
    userInputIsValid: userNameInputIsValid,
    hasError: userNameInputHasError,
    userInputChangeHandler: userNameInputChangeHandler,
    userInputBlurHandler: userNameInputBlurHandler,
  } = useInput((value) =>
    /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([ '-][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/.test(value)
  );

  const {
    userInput: userEmailInput,
    userInputIsValid: userEmailInputIsValid,
    hasError: userEmailInputHasError,
    userInputChangeHandler: userEmailInputChangeHandler,
    userInputBlurHandler: userEmailInputBlurHandler,
  } = useInput((value) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
  );

  const {
    userInput: userPasswordInput,
    userInputIsValid: userPasswordInputIsValid,
    hasError: userPasswordInputHasError,
    userInputChangeHandler: userPasswordInputChangeHandler,
    userInputBlurHandler: userPasswordInputBlurHandler,
  } = useInput((value) => value.trim().length > 5);

  const {
    userInput: userConfirmPasswordInput,
    userInputIsValid: userConfirmPasswordInputIsValid,
    hasError: userConfirmPasswordInputHasError,
    userInputChangeHandler: userConfirmPasswordInputChangeHandler,
    userInputBlurHandler: userConfirmPasswordInputBlurHandler,
  } = useInput((value) => value === userPasswordInput);

  let formIsValid = false;
  if (
    userNameInputIsValid &&
    userEmailInputIsValid &&
    userPasswordInputIsValid &&
    userConfirmPasswordInputIsValid
  ) {
    formIsValid = true;
  }

  const registrationFormSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        body: JSON.stringify({
          name: userNameInput,
          email: userEmailInput,
          password: userPasswordInput,
          confirmPassword: userConfirmPasswordInput,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      setIsLoading(false);
      setAlert({ scenario: "success", message: "Registered successfully" });
      setTimeout(() => login(data.user, data.token), 1000);
    } catch (err) {
      setIsLoading(false);
      setAlert({ scenario: "error", message: err.message });
    }
  };

  const nameInputClass = userNameInputHasError ? "is-invalid" : "";
  const emailInputClass = userEmailInputHasError ? "is-invalid" : "";
  const passInputClass = userPasswordInputHasError ? "is-invalid" : "";
  const confirmPassInputClass = userConfirmPasswordInputHasError
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
            id="userName"
            label="Name"
            placeholder="Parvesh"
            type="text"
            value={userNameInput}
            className={nameInputClass}
            onChange={userNameInputChangeHandler}
            onBlur={userNameInputBlurHandler}
            invalidFeedback="Please mention valid name"
          />
          <Input
            id="userEmail"
            label="Email"
            placeholder="user@gmail.com"
            type="email"
            value={userEmailInput}
            className={emailInputClass}
            onChange={userEmailInputChangeHandler}
            onBlur={userEmailInputBlurHandler}
            invalidFeedback="Please mention valid email"
          />
          <Input
            id="userPassword"
            label="Password"
            placeholder="*********"
            type="password"
            value={userPasswordInput}
            className={passInputClass}
            onChange={userPasswordInputChangeHandler}
            onBlur={userPasswordInputBlurHandler}
            invalidFeedback="Password must be six characters long"
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
            placeholder="*********"
            type="password"
            value={userConfirmPasswordInput}
            className={confirmPassInputClass}
            onChange={userConfirmPasswordInputChangeHandler}
            onBlur={userConfirmPasswordInputBlurHandler}
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

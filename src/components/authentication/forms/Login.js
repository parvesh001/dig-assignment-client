import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../../UIs/Input";
import useInput from "../../../hooks/useInput";
import Alert from "../../../UIs/Alert";
import { AuthContext } from "../../../context/authContext";
import "./Login.css";

export default function Login({ onRegistering }) {
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const {
   userInput:userEmailInput,
   userInputIsValid:userEmailInputIsValid,
    hasError:userEmailInputHasError,
   userInputChangeHandler:userEmailInputChangeHandler,
   userInputBlurHandler:userEmailInputBlurHandler,
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

  let formIsValid = false;
  if (userEmailInputIsValid && userPasswordInputIsValid) {
    formIsValid = true;
  }

  const loginFormSubmitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) return;
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: userEmailInput,
          password: userPasswordInput,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json()
      setIsLoading(false);
      setAlert({ scenario: "success", message: "login successfully" });
      setTimeout(() => login(data.user, data.token), 1000);
    } catch (err) {
      setIsLoading(false);
      setAlert({ scenario: "error", message: err.message });
    }
  };

  const emailInputClass = userEmailInputHasError ? "is-invalid" : "";
  const passInputClass = userPasswordInputHasError ? "is-invalid" : "";

  return (
    <>
      {alert && (
        <Alert
          scenario={alert.scenario}
          message={alert.message}
          dismiss={() => setAlert(null)}
        />
      )}

      <div className="h-100 d-flex flex-column justify-content-center mx-auto mt-3 login-container">
        <div className="mb-2 mb-md-3 mb-lg-4">
          <h2 className="text-primary text-center fs-4 fs-md-2">
            Please Login
          </h2>
        </div>
        <form className="m-b-3" onSubmit={loginFormSubmitHandler}>
          <Input
            className={emailInputClass}
            id="userEmail"
            label="Email"
            placeholder="user@gmail.com"
            type="email"
            value={userEmailInput}
            onChange={userEmailInputChangeHandler}
            onBlur={userEmailInputBlurHandler}
            invalidFeedback="Please mention valid email"
          />
          <Input
            className={passInputClass}
            id="userPassword"
            label="Password"
            placeholder="*********"
            type="password"
            value={userPasswordInput}
            onChange={userPasswordInputChangeHandler}
            onBlur={userPasswordInputBlurHandler}
            invalidFeedback="Please mention valid password"
          />
          <Link className="mb-3 d-block text-decoration-none">
            Forget Your Password?
          </Link>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!formIsValid}
          >
            {isLoading ? "loading..." : "login"}
          </button>
        </form>
        <div>
          <button
            type="button"
            className="btn btn-transparent mx-auto d-block text-secondary"
            onClick={onRegistering}
          >
            Create New Account
          </button>
        </div>
      </div>
    </>
  );
}

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../../UIs/Input";
import useInput from "../../../hooks/useInput";
import Alert from "../../../UIs/Alert";
// import { AuthContext } from "../../../context/authContext";
// import useHttp from "../../../hooks/use-http";
import './Login.css'

export default function Login({ onRegistering }) {
//   const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

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

  let formIsValid = false;
  if (authorEmailInputIsValid && authorPasswordInputIsValid) {
    formIsValid = true;
  }

  const loginFormSubmitHandler = async (event) => {
    // event.preventDefault();

    // if (!formIsValid) return;
    // setIsLoading(true);

    // try {
    //   const data = await sendLoginRequest({
    //     endpoint: "authors/login",
    //     method: "POST",
    //     body: JSON.stringify({
    //       email: authorEmailInput,
    //       password: authorPasswordInput,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   setIsLoading(false);
    //   setAlert({ scenario: "success", message: "login successfully" });
    //   setTimeout(() => login(data.data.author, data.token), 1000);
    // } catch (err) {
    //   setIsLoading(false);
    //   setAlert({ scenario: "error", message: err.message });
    // }
  };

  const emailInputClass = authorEmailInputHasError ? "is-invalid" : "";
  const passInputClass = authorPasswordInputHasError ? "is-invalid" : "";

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
            id="authorEmail"
            label="Email"
            placeholder="author@gmail.com"
            type="email"
            value={authorEmailInput}
            onChange={authorEmailInputChangeHandler}
            onBlur={authorEmailInputBlurHandler}
            invalidFeedback="Please mention valid email"
          />
          <Input
            className={passInputClass}
            id="authorPassword"
            label="Password"
            placeholder="*********"
            type="password"
            value={authorPasswordInput}
            onChange={authorPasswordInputChangeHandler}
            onBlur={authorPasswordInputBlurHandler}
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
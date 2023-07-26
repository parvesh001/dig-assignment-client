import React, { useContext, useState } from "react";
import Input from "../../UIs/Input";
import useInput from "../../hooks/useInput";
import "./UpdateProfile.css";
import { AuthContext } from "../../context/authContext";
import Alert from "../../UIs/Alert";

export default function CurrentuserUpdateForm() {
  const { user, updateUser, token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const {
    userInput: userNameInput,
    userInputIsValid: userNameInputIsValid,
    userInputBlurHandler: userNameInputBlurHandler,
    userInputChangeHandler: userNameInputChangeHandler,
    hasError: userNameInputHasError,
  } = useInput(
    (value) => /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([ '-][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/.test(value),
    user.name
  );

  const {
    userInput: userEmailInput,
    userInputIsValid: userEmailInputIsValid,
    hasError: userEmailInputHasError,
    userInputChangeHandler: userEmailInputChangeHandler,
    userInputBlurHandler: userEmailInputBlurHandler,
  } = useInput(
    (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
    user.email
  );
  let formIsValid = false;
  if (userNameInputIsValid && userEmailInputIsValid) {
    formIsValid = true;
  }

  const updateFormSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/users/updateMe", {
        method: "PATCH",
        body: JSON.stringify({ name: userNameInput, email: userEmailInput }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      updateUser(data.user);
      setIsLoading(false);
    } catch (err) {
      setAlert({ scenario: "error", message: err.message });
      setIsLoading(false);
    }
  };

  const nameInputClass = userNameInputHasError ? "is-invalid" : "";
  const emailInputClass = userEmailInputHasError ? "is-invalid" : "";

  return (
    <>
      {alert && (
        <Alert
          scenario={alert.scenario}
          message={alert.message}
          dismiss={() => setAlert(null)}
        />
      )}
      <div className="mt-5 update-container mx-auto">
        <h4 className="text-primary"> Update Your Credentials</h4>
        <form onSubmit={updateFormSubmitHandler}>
          <Input
            type="text"
            label="Update Name"
            className={nameInputClass}
            id="update-name"
            placeholder="Update Your Name"
            onBlur={userNameInputBlurHandler}
            onChange={userNameInputChangeHandler}
            value={userNameInput}
            invalidFeedback="Please provide valid name input"
          />
          <Input
            type="email"
            label="Update Email"
            className={emailInputClass}
            id="update-email"
            placeholder="Update Your Email"
            onBlur={userEmailInputBlurHandler}
            onChange={userEmailInputChangeHandler}
            value={userEmailInput}
            invalidFeedback="Please provide valid email input"
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!formIsValid}
          >
            {isLoading ? "Loading..." : "Update"}
          </button>
        </form>
      </div>
    </>
  );
}

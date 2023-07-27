import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import UpdateProfile from "./UpdateProfile";
import Alert from "../../UIs/Alert";
import "./Profile.css";

export default function Profile() {
  const { user, logout, token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const deleteProfileHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/users/deactivateMe", {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + token,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      setIsLoading(false);
      logout();
    } catch (error) {
      setAlert({ scenario: "error", message: error.message });
      setIsLoading(false);
    }
  };

  return (
    <>
      {alert && (
        <Alert
          scenario={alert.scenario}
          message={alert.message}
          dismiss={() => setAlert(null)}
        />
      )}
      <div className="user-profile position-relative">
        <h1 className="text-capitalize">{user.name}</h1>
        <span>{user.email}</span>
        <UpdateProfile />
        <div className="position-absolute top-0 end-0 m-3 m-md-5">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={deleteProfileHandler}
          >
            {isLoading ? "deleting..." : " Delete Profile"}
          </button>
          <p className="text-secondary">
            Caution:You will not be able to login again.
          </p>
        </div>
      </div>
    </>
  );
}

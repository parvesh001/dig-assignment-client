import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import UpdateProfile from './UpdateProfile'
import './Profile.css'

export default function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <div className="user-profile">
      <h1 className="text-capitalize">{user.name}</h1>
      <span>{user.email}</span>
      <UpdateProfile/>
    </div>
  );
}

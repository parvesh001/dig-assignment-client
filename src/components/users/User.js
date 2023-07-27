import React from "react";
import "./User.css";

export default function User({ name, email }) {
  return (
    <div className="shadow p-3 text-center rounded user-container">
      <h4>{name}</h4>
      <span>{email}</span>
    </div>
  );
}

import React, { useState } from "react";
import Registration from "./forms/Register";
import Login from "./forms/Login";
import './Authentication.css'

export default function Authentication() {
  const [registering, setRegistering] = useState(false);
  return (
    <div className="authentication-container">
      {registering && <Registration onLogin={() => setRegistering(false)} />}

      {!registering && <Login onRegistering={() => setRegistering(true)} />}
    </div>
  );
}

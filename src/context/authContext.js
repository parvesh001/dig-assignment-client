import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: {},
  token: "",
  isLogedIn: false,
  login: (user, token) => {},
  logout: () => {},
  updateUser:()=>{}
});

const AuthContextProvider = ({ children }) => {
  const initialUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(initialUser);
  const [token, seToken] = useState(localStorage.getItem("token"));
  const isLogedIn = !!token;

  const navigate = useNavigate();

  const login = (user, token) => {
    setUser(user);
    seToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    navigate("/profile");
  };

  const logout = () => {
    setUser({});
    seToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const updateUser = (user)=>{
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }


  const values = {
    user,
    token,
    isLogedIn,
    login,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
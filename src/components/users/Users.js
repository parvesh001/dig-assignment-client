import React, { useContext, useEffect, useState } from "react";
import SearchEngine from "../searchEngine/SearchEngine";
import User from "./User";
import "./Users.css";
import { AuthContext } from "../../context/authContext";
import Pagination from "../../UIs/Pagination";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true)
  const limit = 4;

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          `http://localhost:8080/users?page=${currentPage}&limit=${limit}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const data = await response.json();
        setUsers(data.users);
        setTotalPages(data.totalPages);
        setIsLoading(false)
      } catch (err) {
        console.log(err);
        setIsLoading(false)
      }
    })();
  }, [token, currentPage]);

  const userSearchHandler = async (userName) => {
    try {
      const response = await fetch(
        `http://localhost:8080/users?page=${currentPage}&limit=${limit}&search=${userName}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="users-container">
      <SearchEngine
        onSearchUser={userSearchHandler}
        currentPage={currentPage}
        limit={limit}
      />
      <div className="d-flex flex-column gap-2 mt-3 mt-md-5">
        {users.map((user) => (
          <User key={user._id} name={user.name} email={user.email} />
        ))}
        {!users.length && !isLoading && <p className="text-center text-primary fw-bold fs-4">No user found</p>}
      </div>
     {users.length > 0 && <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(num) => setCurrentPage(num)}
      />}
    </div>
  );
}

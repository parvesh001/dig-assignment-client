import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./SearchEngine.css";

export default function SearchEngine({ onSearchUser, currentPage, limit }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { token } = useContext(AuthContext);

  const handleSearchChange = async (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.trim() === "") {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/users/suggestions?keys=${event.target.value}&page=${currentPage}&limit=${limit}`,
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
      setSuggestions(data.suggestions);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSuggestionsClick = (name) => {
    setSearchTerm(name);
    setSuggestions([]);
  };

  const userSearchFormHandler = (event) => {
    event.preventDefault();
    onSearchUser(searchTerm);
  };

  return (
    <>
      <form className="search-form" onSubmit={userSearchFormHandler}>
        <div className="w-100 position-relative">
          <input
            type="text"
            className="form-control"
            placeholder="user name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {suggestions && (
            <ul className="list-group mt-2 position-absolute w-100">
              {suggestions.map((suggestion) => (
                <li
                  className="list-group-item"
                  key={suggestion._id}
                  onClick={handleSuggestionsClick.bind(null, suggestion.name)}
                  style={{ cursor: "pointer" }}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-outline-primary align-self-start"
        >
          Search
        </button>
      </form>
    </>
  );
}

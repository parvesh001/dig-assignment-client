import React, { useState } from "react";
import "./SearchEngine.css";

const searchSuggestions = [
  "apple",
  "banana",
  "orange",
  "grapes",
  "strawberry",
  "watermelon",
  "pineapple",
  "kiwi",
  "mango",
];

export default function SearchEngine() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([...searchSuggestions]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <form className="search-form">
        <div className="w-100">
          <input
            type="text"
            className="form-control"
            placeholder="user name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {suggestions && (
            <ul className="list-group mt-2">
              {suggestions.map((suggestion) => (
                <li className="list-group-item">{suggestion}</li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className="btn btn-outline-primary align-self-start">
          Search
        </button>
      </form>
    </>
  );
}

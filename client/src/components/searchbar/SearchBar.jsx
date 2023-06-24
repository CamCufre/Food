import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { getAllRecipes, getRecipesById, getRecipesByName } from '../redux/actions';
import style from './SearchBar.module.css'

const SearchBar = ({ getAllRecipes, getRecipesById, getRecipesByName, setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [previousSearchTerm, setPreviousSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    if (parseInt(searchTerm)) {
      getRecipesById(searchTerm);
    } else {
      getRecipesByName(searchTerm);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (previousSearchTerm) {
      if (parseInt(previousSearchTerm)) {
        getRecipesById(previousSearchTerm);
      } else {
        getRecipesByName(previousSearchTerm);
      }
      setPreviousSearchTerm("");
    }
  }, [previousSearchTerm, getRecipesById, getRecipesByName]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={style.input}
        type="text"
        placeholder="Search recipes by name or ID..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className={style.button1} type="button" onClick={handleReset}>x</button>
      <button className={style.button} type="submit">Search!</button>
    </form>
  );
};

const mapDispatchToProps = {
  getAllRecipes,
  getRecipesById,
  getRecipesByName
};

export default connect(null, mapDispatchToProps)(SearchBar);




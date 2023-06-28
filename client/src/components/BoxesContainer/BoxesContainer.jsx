import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { getAllRecipes } from '../redux/actions';
import RecipeBox from "../recipebox/RecipeBox";
import Pagination from "../pagination/Pagination";
import style from './BoxesContainer.module.css'
import { NotFound } from "./notfound";

const BoxesContainer = ({ recipes, getAllRecipes, currentPage, setCurrentPage }) => {
  useEffect(() => {
    getAllRecipes();
  }, []);

  const recipesPerPage = 9;
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const recipeBoxes = recipes
    .slice((currentPage - 1) * recipesPerPage, currentPage * recipesPerPage)
    .map(({ id, name, image, healthscore, diets }) => (
      <RecipeBox
        key={id}
        id={id}
        name={name}
        image={image}
        healthscore={healthscore}
        diets={diets}
      />
    ));

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handlePageChange={handlePageChange}
        handleNextPage={handleNextPage}
      />   
      {recipes.length === 0 ? (
        <NotFound/>
      ) : (
        <div className={style.container}>
          {recipeBoxes}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    recipes: state.allHomeRecipes
  };
};

const mapDispatchToProps = {
  getAllRecipes
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxesContainer);


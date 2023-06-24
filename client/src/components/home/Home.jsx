import React, { useEffect } from "react";
import NavBar from "../navbar/NavBar";
import BoxesContainer from "../BoxesContainer/BoxesContainer";
import FilterOrder from "../filterOrder/FilterOrder";
import SearchBar from "../searchbar/SearchBar";
import style from './Home.module.css'

const Home = ({currentPage, setCurrentPage}) => {
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.background = "white";
    
    return () => {
      body.style.background = "";
    };
  }, []);

  return (
    <div>
      <div>
      <NavBar />
      <div className={style.search}>
      <SearchBar setCurrentPage={setCurrentPage}/>
      </div>
      </div>
      <div className={style.titles}>
      <h1 className={style.title2}>Search any or create your own recipe!</h1> 
      <h1 className={style.title}>Search any or create your own recipe!</h1> 
      </div>      
      <div>
      <FilterOrder setCurrentPage={setCurrentPage}/>
      </div>
      <BoxesContainer currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  );
};

export default Home;
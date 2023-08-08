import React, { useEffect } from "react";
import BoxesContainer from "../BoxesContainer/BoxesContainer";
import FilterOrder from "../filterOrder/FilterOrder";
import SearchBar from "../searchbar/SearchBar";
import style from './Home.module.css';

const ColorRotatingText = ({ text }) => {
  const [colorIndex, setColorIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 600);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <h1 className={style.title}>
      {text.split('').map((char, index) => {
        let charColor;
        if (index % 4 === colorIndex) {
          charColor = { color: "rgb(255, 247, 125)" };
        } else if ((index + 1) % 4 === colorIndex) {
          charColor = { color: "rgb(115, 179, 83)" };
        } else if ((index + 2) % 4 === colorIndex) {
          charColor = { color: "rgb(184, 219, 255)" };
        } else {
          charColor = { color: "rgb(181, 133, 230)" };
        }
        return (
          <span key={index} style={charColor}>{char}</span>
        );
      })}
    </h1>
  );
};

const Home = ({ currentPage, setCurrentPage }) => {

  const text = 'Search any or create your own recipe!';

  return (
    <div className={style.contenedor}>
      <div className={style.titles}>
        <ColorRotatingText text={text} />
      </div>
      <div className={style.search}>
        <SearchBar setCurrentPage={setCurrentPage} />
      </div>    
      <div className={style.filter}>
        <FilterOrder setCurrentPage={setCurrentPage} />
      </div>
      <div>
        <BoxesContainer currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default Home;

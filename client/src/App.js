import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/landing/Landing';
import Home from './components/home/Home'
import Form from './components/createRecipe/Form';
import Details from './components/details/Details';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
          <Route path="/createRecipe" element={<Form />} />
          <Route path="/recipeDetails/:id" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




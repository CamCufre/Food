import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { createRecipe, getDietTypes } from '../redux/actions';
import { Link } from 'react-router-dom';
import NavBar from "../navbar/NavBar";
import style from './Form.module.css';
import {validateTitleLength, validateDescriptionLength, validateSteps, validateImageURL, validateHealthscore, validateDiets, validateDuplicateDiet} from '../Validation/Validation.jsx';

const Form = ({ createRecipe, getDietTypes, dietTypes }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    steps: [],
    image: "",
    diets: [],
    healthscore: ""
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    description: '',
    steps: '',
    image: '',
    healthscore: '',
    diets: ''
  });

  const validateForm = () => {
    const errors = {
      name: validateTitleLength(formData),
      description: validateDescriptionLength(formData),
      steps: validateSteps(formData),
      image: validateImageURL(formData),
      healthscore: validateHealthscore(formData),
      diets: validateDiets(formData),
      duplicateDiet: validateDuplicateDiet(formData)
    };
  
    setFormErrors(errors);
  };

  const [manualDiet, setManualDiet] = useState(""); 

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.background = "white";

    // Limpia el estilo de fondo al desmontar el componente
    return () => {
      body.style.background = "";
    };
  }, []);

  useEffect(() => {
    getDietTypes();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
    validateForm();
  };

  const handleStepChange = (index, value) => {
    setFormData((prevFormData) => {
      const updatedSteps = [...prevFormData.steps];
      updatedSteps[index] = value;
      return {
        ...prevFormData,
        steps: updatedSteps
      };
    });
    validateForm();
  };

  const handleAddStep = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      steps: [...prevFormData.steps, ""]
    }));
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevFormData) => {
      let updatedDiets = [...prevFormData.diets];
      if (checked) {
        updatedDiets.push(value);
      } else {
        updatedDiets = updatedDiets.filter((diet) => diet !== value);
      }
      return {
        ...prevFormData,
        diets: updatedDiets
      };
    });
    validateForm();
  };

  const handleAddManualDiet = (event) => {
    event.preventDefault();
    if (manualDiet) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        diets: [...prevFormData.diets, manualDiet]
      }));
      setManualDiet(""); 
    }
    validateForm();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = ["name", "description", "image", "healthscore"];
    const incompleteFields = requiredFields.filter(
      (field) => !formData[field]
    );

    const hasSteps = formData.steps.length > 0;
    const hasDiets = formData.diets.length > 0;
  
    if (incompleteFields.length > 0 || !hasSteps || !hasDiets) {
      let errorMessage = "Please fill in all fields:";
      if (incompleteFields.length > 0) {
        errorMessage += ` ${incompleteFields.join(",")}`;
      }
      if (!hasSteps) {
        errorMessage += " Add at least one step.";
      }
      if (!hasDiets) {
        errorMessage += " Add at least one diet.";
      }
      window.alert(errorMessage);
      return;
    }
  
    createRecipe(formData);
    resetForm();
    window.alert("Recipe created successfully");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      steps: [""],
      image: "",
      diets: [],
      healthscore: ""
    });
  };

  return (
    <div>
      <NavBar/>
      <div className={style.container}>
      <h1 className={style.custom}>Create your custom one!</h1>
      <form className={style.form} onSubmit={handleSubmit}>
      <label className={style.label}>
        Recipe title:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {formErrors.name && <span className={style.error}>{formErrors.name}</span>}
      </label>
      <label className={style.label}>
        Description:
        <textarea
          className={style.description}
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        ></textarea>
        {formErrors.description && <span className={style.error}>{formErrors.description}</span>}
      </label>
      <label className={style.label}>
        Steps:
        {formData.steps.map((step, index) => (
          <input
            key={index}
            type="text"
            value={step}
            onChange={(e) => handleStepChange(index, e.target.value)}
          />
        ))}
        <button className={style.buton} type="button" onClick={handleAddStep}>
          Add step
        </button>
        {formErrors.steps && <span className={style.error}>{formErrors.steps}</span>}
      </label>
      <label className={style.label}>
        Image URL:
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
        />
        {formErrors.image && <span className={style.error}>{formErrors.image}</span>}
      </label>
      <label className={style.label}>
        Diets:
        <div>
          {dietTypes.map((diet) => (
            <label key={diet.id}>
              <input
                type="checkbox"
                name="diets"
                value={diet.name}
                checked={formData.diets.includes(diet.name)}
                onChange={handleCheckboxChange}
              />
              {diet.name}
            </label>
          ))}
          {formData.diets.map((diet, index) => (
            <p className={style.p} key={index}>{diet}</p>
          ))}
          <div className={style.addcustom}> <input
            type="text"
            placeholder="Add custom diet"
            value={manualDiet}
            onChange={(e) => setManualDiet(e.target.value)}
          />
          <button className={style.buton} type="button" onClick={handleAddManualDiet}>
            Add
          </button></div>
         
        </div>
        {formErrors.diets && <span className={style.error}>{formErrors.diets}</span>}
        {formErrors.duplicateDiet && <span className={style.error}>{formErrors.duplicateDiet}</span>}
      </label>

      <label className={style.label}>
        Healthscore:
        <input
          type="number"
          name="healthscore"
          value={formData.healthscore}
          onChange={handleInputChange}
        />
        {formErrors.healthscore && <span className={style.error}>{formErrors.healthscore}</span>}
      </label>
      <button className={style.buton} type="submit">Create Recipe!</button>
      <Link to='/home'>
      <button className={style.buton}>To Home</button>
      </Link>
    </form>
    </div>
    </div>
    
  );
};

const mapStateToProps = (state) => ({
    dietTypes: state.dietTypes
  });

const mapDispatchToProps = {
  createRecipe,
  getDietTypes
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
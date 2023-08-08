import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getDietTypes, createRecipe } from "../redux/actions";
import ValidateForm from "../Validation/Validation";
import style from './Form.module.css';
import image from '../assets/bg-images/form-img.png';
import { Link } from "react-router-dom";

const Form = ({ dietTypes, getDietTypes, createRecipe }) => {

  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (formSubmitted) {
      setFormData({
        name: "",
        description: "",
        steps: [],
        image: "",
        diets: [],
        healthscore: "0"
      });
      setErrors({});
      setNewStep("");
      setDuplicateDietError("");
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.background = "white";

    return () => {
      body.style.background = "";
    };
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    steps: [],
    image: "",
    diets: [],
    healthscore: ""
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getDietTypes();
  }, [getDietTypes]);

  const [newStep, setNewStep] = useState("");

  const [duplicateDietError, setDuplicateDietError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value
    }));

    const validationErrors = ValidateForm({
      ...formData,
      [name]: value
    });
    setErrors(validationErrors);
  };

  const handleAddStep = () => {
    if (newStep.trim() !== "") {
      const newSteps = [...formData.steps, newStep];
      setFormData((prevFormData) => ({
        ...prevFormData,
        steps: newSteps
      }));
      setNewStep("");

      const validationErrors = ValidateForm({
        ...formData,
        steps: newSteps
      });
      setErrors(validationErrors);
    }
  };

  const handleRemoveStep = (index) => {
    const newSteps = [...formData.steps];
    newSteps.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      steps: newSteps
    }));

    const validationErrors = ValidateForm({
      ...formData,
      steps: newSteps
    });
    setErrors(validationErrors);
  };

  const handleStepInputChange = (event) => {
    setNewStep(event.target.value);
  };

  const handleAddDiet = (diet) => {
    const lowerCaseDiet = diet.toLowerCase();

    if (formData.diets.includes(lowerCaseDiet)) {
      setDuplicateDietError("Diet already added");
      return;
    }

    setDuplicateDietError("");

    setFormData((prevFormData) => ({
      ...prevFormData,
      diets: [...prevFormData.diets, lowerCaseDiet],
      customDiet: ""
    }));

    const validationErrors = ValidateForm({
      ...formData,
      diets: [...formData.diets, lowerCaseDiet]
    });
    setErrors(validationErrors);
  };

  const handleRemoveDiet = (index) => {
    setFormData((prevFormData) => {
      const updatedDiets = [...prevFormData.diets];
      updatedDiets.splice(index, 1);

      const updatedFormData = {
        ...prevFormData,
        diets: updatedDiets
      };

      const validationErrors = ValidateForm(updatedFormData);
      setErrors(validationErrors);

      return updatedFormData;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(errors).length === 0) {
      createRecipe(formData);
      setFormSubmitted(true);
      alert("Recipe successfully Created!")
    } else {
      const missingFields = Object.keys(errors).join(", ");
      const errorMessage = `Required to fill in all fields. Missing: ${missingFields}`;
      alert(errorMessage);
    }
  };

  return (
    <div style={{marginTop:"8%"}}>
      <Link to='/home'>
      <button className={style.tohome}>To Home</button>
      </Link>
      <img className={style.image} src={image} alt=''/>
      <form className={style.form} onSubmit={handleSubmit}>
      <label className={style.create}>Create your custom one!</label>
        {/* <label className={style.title}>Recipe Title</label> */}
        <input
          className={style.input}
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          onBlur={handleInputChange}
          placeholder="Recipe Title"
        />
        {errors.name && <span className={style.error}>{errors.name}</span>}

        {/* <label className={style.title}>Description</label> */}
        <textarea
          className={style.textarea}
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          onBlur={handleInputChange}
          placeholder="Describe your recipe briefly"
        />
        {errors.description && <span className={style.error}>{errors.description}</span>}

        {/* <label className={style.title}>Steps</label> */}
        {formData.steps.map((step, index) => (
          <div key={index}>
            <input className={style.added} type="text" value={step} readOnly />
            <button className={style.button} type="button" onClick={() => handleRemoveStep(index)}>
              Remove
            </button>
          </div>
        ))}
          <input
            className={style.Xinput}
            type="text"
            value={newStep}
            onChange={handleStepInputChange}
            onBlur={handleStepInputChange}
            placeholder="Steps..."
          />
          <button className={style.Xbutton} type="button" onClick={handleAddStep}>
            Add Step
          </button>
        {errors.steps && <span className={style.error}>{errors.steps}</span>}

        {/* <label className={style.title}>Diets</label> */}
        <select
          className={style.select}
          name="diets"
          value={""}
          onChange={(event) => handleAddDiet(event.target.value)}
        >
          <option value="">Select Diet</option>
          {dietTypes.map((diet) => (
            <option key={diet.id} value={diet.name}>
              {diet.name}
            </option>
          ))}
        </select>
        {formData.diets.map((diet, index) => (
          <div key={index}>
            <input className={style.added} type="text" value={diet} readOnly />
            <button className={style.button} type="button" onClick={() => handleRemoveDiet(index)}>
              Remove
            </button>
          </div>
        ))}
        <input
          className={style.Xinput}
          type="text"
          placeholder="e.g. lemon diet"
          value={formData.customDiet || ""}
          onChange={(event) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              customDiet: event.target.value
            }))
          }
        />
        <button
          className={style.Xbutton}
          type="button"
          onClick={() => handleAddDiet(formData.customDiet)}
        >
          Add Custom Diet
        </button>
        {errors.diets && <span className={style.error}>{errors.diets}</span>}
        {duplicateDietError && <span className={style.error}>{duplicateDietError}</span>}

        {/* <label className={style.title}>Image URL</label> */}
        <input
          name="image"
          value={formData.image}
          type="text"
          onChange={handleInputChange}
          onBlur={handleInputChange}
          placeholder="Image URL"
          className={style.input}
        />
        {errors.image && <span className={style.error}>{errors.image}</span>}

        {/* <label className={style.title}>Health-Score</label> */}
        <input
          name="healthscore"
          value={formData.healthscore}
          type="number"
          onChange={handleInputChange}
          onBlur={handleInputChange}
          placeholder="Health-Score (0 - 100)"
          className={style.input}
        />
        {errors.healthscore && <span className={style.error}>{errors.healthscore}</span>}

        <button className={style.Sbutton} type="submit">CREATE RECIPE</button>
      </form>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dietTypes: state.dietTypes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDietTypes: () => dispatch(getDietTypes()),
    createRecipe: (formData) => dispatch(createRecipe(formData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);

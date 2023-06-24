
//campos vacíos en el formulario
export const validateFormFields = (formData) => {
    const requiredFields = ["name", "description", "image", "healthscore"];
    const incompleteFields = requiredFields.filter((field) => !formData[field]);
  
    return incompleteFields;
  };
  
  // al menos un paso y una dieta agregados
  export const validateStepsAndDiets = (formData) => {
    const hasSteps = formData.steps.length > 0;
    const hasDiets = formData.diets.length > 0;
  
    return !(hasSteps && hasDiets);
  };
  
  // la longitud mínima del título
  export const validateTitleLength = (formData) => {
    if (formData.name.length < 10) {
      return 'Title must contain at least 10 characters.';
    }
    return '';
  };
  
  //la longitud mínima de la descripción
  export const validateDescriptionLength = (formData) => {
    if (formData.description.length < 10) {
      return 'Description must contain at least 10 characters.';
    }
    return '';
  };
  
  // al menos un paso agregado
  export const validateSteps = (formData) => {
    if (formData.steps.length < 1) {
      return 'Add at least 1 step.';
    }
    return '';
  };
  
  // si se ingreso una URL de imagen
  export const validateImageURL = (formData) => {
    if (formData.image.length === 0) {
      return 'Add a link.';
    }
    return '';
  };
  
  // el rango de healthscore
  export const validateHealthscore = (formData) => {
    if (formData.healthscore < 0 || formData.healthscore > 100) {
      return 'Healthscore must be between 0 and 100.';
    }
    return '';
  };
  
  // al menos una dieta agregada
  export const validateDiets = (formData) => {
    if (formData.diets.length < 1) {
      return 'Add or create at least 1 diet.';
    }
    return '';
  };
  
  // si una dieta ya fue añadida
export const validateDuplicateDiet = (formData) => {
  const uniqueDiets = new Set(formData.diets);

  if (uniqueDiets.size !== formData.diets.length) {
    return 'A diet can only be added once.';
  }
  return '';
};
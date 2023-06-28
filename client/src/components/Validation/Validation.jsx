const ValidateForm = (formData) => {
    const errors = {}
  
  // la longitud mínima del título
  if (formData.name.length < 10) {
    errors.name = 'Title must contain at least 10 characters.';
  }
  
  //la longitud mínima de la descripción
  if (formData.description.length < 10) {
    errors.description = 'Description must contain at least 10 characters.';
  }

  // al menos un paso agregado
    if (formData.steps.length === 0) {
      errors.steps = 'Add at least 1 step.';
    }
  
  // si se ingreso una URL de imagen
  if (formData.image.length === 0) {
    errors.image = 'Add a link.';
  }
  
  // el rango de healthscore
  if (formData.healthscore < 0 || formData.healthscore > 100) {
    errors.healthscore = 'Healthscore must be between 0 and 100.';
  }
  
  // al menos una dieta agregada
  if (formData.diets.length === 0) {
    errors.diets = 'Add at least 1 diet.';
  }

return errors;
}

export default ValidateForm;
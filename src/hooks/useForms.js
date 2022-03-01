import { useState } from 'react';

export default function useForms(initialValues) {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const clearForm = e => {
    e.preventDefault();
    setFormValues(initialValues);
  };

  return [formValues, handleChange, clearForm];
}

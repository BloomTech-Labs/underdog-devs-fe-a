import { useState } from 'react';

export default function useForms(initialValues) {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSelect = ({ name, value }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const clearForm = () => {
    setFormValues(initialValues);
  };

  return [formValues, setFormValues, handleChange, handleSelect];
}

import { useState } from 'react';

export default function useForms(initialValues) {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e, type, targetName) => {
    let name;
    let value;
    if (type === 'select') {
      name = targetName;
      value = e;
    } else if (type === 'radio') {
      name = e.target.name;
      value = e.target.value;
    } else if (e.target.type === 'text') {
      name = e.target.id;
      value = e.target.value;
    } else {
      name = e.target.name;
      value = e.target.value;
    }
    setFormValues({ ...formValues, [name]: value });
  };

  const handleTechStack = e => {
    const { value } = e.target;
    let arr = [...formValues.tech_stack];
    if (e.target.checked) {
      arr = [...formValues.tech_stack, value];
    } else {
      arr = formValues.tech_stack.filter(e => e !== value);
    }
    setFormValues({ ...formValues, tech_stack: arr });
  };

  const clearForm = () => {
    setFormValues(initialValues);
  };

  return {
    formValues,
    handleChange,
    clearForm,
    setFormValues,
    handleTechStack,
  };
}

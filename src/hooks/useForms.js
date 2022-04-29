import { useState } from 'react';

export default function useForms(initialValues) {
  const [formValues, setFormValues] = useState(initialValues);

  // Different change handlers are required for each input type
  // because each type has its information in different fields in the event object.

  const handleText = e => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleRadio = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleCheckbox = e => {
    setFormValues({ ...formValues, [e.target.value]: e.target.checked });
  };

  // Ant Design's "Select" component does not return an event object,
  // it returns only a value as a simple-type variable, such as a string,
  // number or boolean.
  // The name and value in the formValues state are passed in as an argument
  // in the function call in the onChange attribute on the Select component.
  const handleSelect = ({ name, value }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  // The change handlers are returned in an object, to be destructured as
  // needed in the Form, according to the input type used in the form.
  const changeHandlers = {
    handleText,
    handleRadio,
    handleCheckbox,
    handleSelect,
  };

  return { formValues, setFormValues, changeHandlers };
}

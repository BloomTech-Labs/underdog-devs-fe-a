import { useState } from 'react';

export default function useForms(initialValues) {
  const [formValues, setFormValues] = useState(initialValues);

  // Different change handlers are required for each input type
  // because each type has its information in different fields in the event.

  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleRadio = e => {
    console.log('handleRadio arg: ', e);
    console.log('formValues: ', formValues);
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
  // needed in the Form,  according to the input type used in the form.

  const handlers = {
    handleChange,
    handleRadio,
    handleCheckbox,
    handleSelect,
  };

  return { formValues, setFormValues, handlers };
}

import { useState } from 'react';

export default function useForms(initialValues) {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
    console.log('formValues: ', formValues);
    console.log('e.target.value: ', e.target.value);
  };

  const handleRadio = e => {
    console.log('handleRadio arg: ', e);
  };

  const handleCheckbox = e => {
    console.log('handleCheckbox arg: ', e);
  };

  const handleSelect = ({ name, value }) => {
    setFormValues({ ...formValues, [name]: value });
    console.log('formValues: ', formValues);
  };

  const handlers = {
    handleChange,
    handleRadio,
    handleCheckbox,
    handleSelect,
  };

  return { formValues, setFormValues, handlers };
}

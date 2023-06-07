import { useState } from 'react';

export default function useForms(initialValues) {
  const [formValues, setFormValues] = useState(initialValues);

  const newMentor = formValues => {
    return {
      city: formValues['city'],
      commitment: formValues['commitment'],
      country: formValues['country'],
      current_company: formValues['current_company'],
      current_position: formValues['current_position'],
      email: formValues['email'],
      first_name: formValues['first_name'],
      industry_knowledge: formValues['industry_knowledge'],
      job_help: formValues['job_help'],
      last_name: formValues['last_name'],
      other_info: formValues['other_info'],
      pair_programming: formValues['pair_programming'],
      profile_id: formValues['profile_id'],
      referred_by: formValues['referred_by'],
      state: formValues['state'],
      tech_stack: formValues['tech_stack'],
      validate_status: formValues['validate_status'],
    };
  };

  const handleChange = (e, type, targetName) => {
    let name;
    let value;
    if (type === 'select') {
      name = targetName;
      value = e;
    } else if (type === 'checkbox') {
      name = e.target.name;
      value = e.target.value;
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
    newMentor,
    handleChange,
    clearForm,
    setFormValues,
    handleTechStack,
  };
}

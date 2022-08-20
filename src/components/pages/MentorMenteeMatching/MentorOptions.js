import { Select } from 'antd';
import { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';

export const Selected = (edit, setMentor, mentor, data, name, nameVal) => {
  /**
   * Owner: Khaleel Musleh
   * Props Being Passed:
   * Props: mentor parameter passed all the way from MentorMenteeMatching -> MentorMenteeInfo -> MentorsCard -> MentorsOptions
   */

  const [mentors, setMentors] = useState([]);

  /**
   * Owner: Khaleel Musleh
   * Selection variable has all the HTML elements to pass to the list of selections for each user, if a user has no mentors then it will return no data.
   *
   */
  let selections = [];

  const { Option } = Select;
  /**
   * Owner: Khaleel Musleh
   * GET mentors based on the mentor_id found in the mentor props, it passes all the ID's into the GET function below and gets the mentors of each user seperately.
   * setMentor gets the data of the mentor information then its passed below to selection
   */
  useEffect(() => {
    axiosWithAuth()
      .get(`/assignments/mentee/${mentor.key}`)
      .then(response => {
        setMentors(response.data);
      });
  }, []);

  function onChange(value) {
    setMentor({ ...data, [nameVal]: value });
  }

  return (
    <>
      {' '}
      {edit || empty(name) ? (
        <div style={{ width: '80%' }}>
          {/**
           * Owner: Khaleel Musleh
           * Update Selection form and removed the old one:
           * Form has filter option and removed the onChange to a seperated Function.
           */}
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Assign a Mentor"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {/**
             * Owner: Khaleel Musleh
             * Selection below gets a list from the GET api call above, then it iterates on each one then pussing an Option element with the first name,
             * last name as values as well as seperate keys obrained from the index of the Array.
             * All <Option> elements are pushed to the selections variable
             */}

            {mentors.forEach((selection, index) => {
              selections.push(
                <Option
                  key={index}
                  value={selection.first_name + ' ' + selection.last_name}
                >
                  {selection.first_name + ' ' + selection.last_name}
                </Option>
              );
            })}

            <>{selections}</>
          </Select>
          ,
        </div>
      ) : (
        <div style={{ width: '80%' }}>
          <p style={{ marginLeft: '5px' }}>{name}</p>
        </div>
      )}
    </>
  );
};

export const empty = mentor => {
  return !mentor || mentor === 'Assign Mentor';
};

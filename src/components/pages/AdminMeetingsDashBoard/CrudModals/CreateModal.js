import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import axios from 'axios';

const CreateModal = props => {
  const { visible, onCreate, onCancel } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    meeting_topic: '',
    meeting_start_time: '',
    meeting_end_time: '',
    mentor_id: '',
    mentee_id: '',
    admin_meeting_notes: '',
    mentor_meeting_notes: '',
    mentee_meeting_notes: '',
  });

  const allMentors = axios.get('localhost:8080/profile/role/mentor');
  const allMentees = axios.get('localhost:8080/profile/role/mentee');
  //create a form and sync values to state
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const randomMeetingId = Math.floor(Math.random() * 100000000000000000);
    const meeting = {
      meeting_id: randomMeetingId,
      meeting_topic: formData.meeting_topic,
      meeting_start_time: formData.meeting_start_time,
      meeting_end_time: formData.meeting_end_time,
      mentor_id: formData.mentor_id,
      mentee_id: formData.mentee_id,
      admin_meeting_notes: formData.admin_meeting_notes,
      mentor_meeting_notes: formData.mentor_meeting_notes,
      mentee_meeting_notes: formData.mentee_meeting_notes,
    };
    console.log(meeting);
    axios.post('http://localhost:8080/meetings/', meeting);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(allMentees, allMentors);
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Meeting
      </Button>
      <br />
      <Modal
        title="Basic Modal"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form
          onSubmit={() => {
            handleSubmit();
          }}
        >
          <label>
            Meeting Topic:
            <input
              type="text"
              name="meeting_topic"
              value={formData.meeting_topic}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Meeting Start Time:
            <input
              type="text"
              name="meeting_start_time"
              value={formData.meeting_start_time}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Meeting End Time:
            <input
              type="text"
              name="meeting_end_time"
              value={formData.meeting_end_time}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Mentor ID:
            <input
              type="text"
              name="mentor_id"
              value={formData.mentor_id}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Mentee ID:
            <input
              type="text"
              name="mentee_id"
              value={formData.mentee_id}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Admin Meeting Notes:
            <input
              type="text"
              name="admin_meeting_notes"
              value={formData.admin_meeting_notes}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Mentor Meeting Notes:
            <input
              type="text"
              name="mentor_meeting_notes"
              value={formData.mentor_meeting_notes}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Mentee Meeting Notes:
            <input
              type="text"
              name="mentee_meeting_notes"
              value={formData.mentee_meeting_notes}
              onChange={handleChange}
            />
          </label>
          <br />
        </form>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal>
    </>
  );
};
export default CreateModal;

//     const handleChange = e => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const showModal = () => {
//       setIsModalOpen(true);
//     };

//     const handleOk = () => {
//       setIsModalOpen(false);
//     };

//     const handleCancel = () => {
//       setIsModalOpen(false);
//     };

//     return (
//       <>
//         <Button type="primary" onClick={showModal}>
//           Create Meeting
//         </Button>
//         <Modal title="New Meeting" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
//          <p>Fill in the form below to create a new meeting!</p>

//          {/* <form>
//               <label>
//               meeting_topic (optional str max 255 chars):
//                 <input type="text" name="meeting_topic" placeholder='Meeting Topic... Optional'/>
//                 </label>
//                 <br />
//                 <label>
//                 meeting_start_time (optional datetime iso8601):
//              <input type="date" name="meeting_start_date" />
//                 </label>
//                 <br />
//                 <label>
//                 meeting_end_time (optional datetime iso8601):
//                 <input type="text" name="meeting_end_time" />
//                 </label>
//                 <br />
//                 <label>
//                 mentor_id (req str suggested 882eb36a-d154-480d-89d4-a1cad1aa7330):
//                 <input type="text" name="mentor_id" />
//                 </label>
//                 <br />
//                 <label>
//                 mentee_id (req str suggested 50ef4f37-b8bd-4c93-a9a3-625e38c2c5cb):
//                 <input type="text" name="mentee_id" />
//                 </label>
//                 <br />
//                 <label>
//                 admin_meeting_notes (optional str max 2000 chars):
//                 <input type="text" name="admin_meeting_notes" />
//                 </label>
//                 <br />
//                 <label>
//                 meeting_missed_by_mentee (optional missed || attended):
//                 <input type="checkbox" name="meeting_missed_by_mentee" value = "" />

//                 </label>
//                 <br />
//                 <label>
//                 mentor_meeting_notes (optional str max 2000 chars):
//                 <input type="text" name="mentor_meeting_notes" />
//                 </label>
//                 <br />
//                 <label>
//                 mentee_meeting_notes (optional str max 2000 chars):
//                 <input type="text" name="mentee_meeting_notes" />
//                 </label>
//                 <br />

//          </form> */}
//         </Modal>
//       </>
//     );
// };
// export default CreateModal;

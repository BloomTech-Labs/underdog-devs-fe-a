/* 
All of the commented out code on this page is to remove the 'no-unused-vars' warnings in the console
*/
import React, { /*useEffect,*/ useState } from 'react';
import { /*Input,*/ Button /*Table, Space*/ } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import MemosForm from './MemosForm';
import MemosTable from '../../common/MemosTable';
// import { SearchOutlined } from '@ant-design/icons';

// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//       name,
//     }) => (
//       <div style={{ padding: 8 }}>
//         <Input
//           autoFocus
//           placeholder="Search by user"
//           value={selectedKeys[0]}
//           onChange={e => {
//             setSelectedKeys(e.target.value ? [e.target.value] : []);
//             confirm({ closeDropdown: false });
//           }}
//           onPressEnter={() => {
//             confirm();
//           }}
//           onBlur={() => {
//             confirm();
//           }}
//           style={{ marginBottom: 8, display: 'block' }}
//         />
//         <Space>
//           <Button
//             onClick={() => confirm()}
//             type="primary"
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters()}
//             type="danger"
//             size="small"
//             style={{ width: 90 }}
//           >
//             Reset
//           </Button>
//         </Space>
//       </div>
//     ),
//     onFilter: (value, record) =>
//       record.createdBy.toLowerCase().includes(value.toLowerCase()),
//   },
// ];

const Memos = props => {
  const [displayModal, setDisplayModal] = useState(false);
  // const [accounts, setAccounts] = useState([]);

  const showModal = () => {
    setDisplayModal(true);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Memos</h2>
        <Button className="add-memo-button">
          <a href="/mymemos">My Memos</a>
        </Button>
        <Button className="add-memo-button" onClick={showModal} type="primary">
          <PlusCircleOutlined />
          Send Memo
        </Button>
        <MemosForm
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
        />
      </div>
      <MemosTable />
    </>
  );
};

export default Memos;

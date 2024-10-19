import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import '../../../../src/assets/styles/UsersList.css'; // Import your custom stylesheet for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { getUsersList, deleteUser, editUser } from '../../../../src/api_service/apiService';
import EditUserModal from '../../pages/editusermodal/EditUserModal ';

const UsersList = () => {
  const [searchText, setSearchText] = useState('');
  const [userList, setUserList] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [open, setOpen] = useState(false);

  const fallbackImage = '/path/to/default-image.png'; // Update this with the correct path to your fallback image

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchUsers = async () => {
    try {
      const response = await getUsersList();
      console.log("fetching users list:", response.data);
      const activeUsers = response.data.filter(user => !user.deleted_at); 
      setUserList(activeUsers || []);
      console.log(response, "Get User List");
    } catch (error) {
      console.error("Error fetching users list:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleAction = async (action, row) => {
    switch (action) {
      case 'edit':
        try {
          setOpen(true);
          const response = await editUser(row.id);
          console.log(response.data.data,"userf Get"); // Fetch user data for editing
          setEditingUser(response.data.data); // Set the fetched data to editingUser state
        } catch (error) {
          console.error('Error fetching user data for edit:', error);
        }
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete row with ID ${row.id}?`)) {
          try {
            await deleteUser(row.id);
            fetchUsers(); 
          } catch (error) {
            console.error("Error deleting user:", error);
          }
        }
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      name: 'S.No.', // Change the column header to "Index"
      cell: (row, index) => index + 1, // Display the index + 1 (for 1-based index)
      sortable: false, // Index is not sortable
    },

    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Profile',
      cell: row => {
        const imageUrl = row.profile_image
        ? `http://localhost:8000/uploads/${row.profile_image}` // Adjusted to point to the correct backend URL
        : fallbackImage;
       console.log(imageUrl,"imageUrl");
  
        return (
          <img
            src={imageUrl}
            alt={row.name}
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            onError={(e) => e.target.src = fallbackImage} 
          />
        );
      },
      sortable: false,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="action-buttons">
          <button className="action-btn view-btn" onClick={() => handleAction('view', row)}>
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button className="action-btn edit-btn" onClick={() => handleAction('edit', row)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="action-btn delete-btn" onClick={() => handleAction('delete', row)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      ),
    },
  ];

  const filteredData = userList.filter(item => {
    const nameMatch = (item.name || '').toLowerCase().includes(searchText.toLowerCase());
    const emailMatch = (item.email || '').toLowerCase().includes(searchText.toLowerCase());
    return nameMatch || emailMatch;
  });

  return (
    <div className="user-list-container">
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={handleSearch}
        className="search-input"
      />

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
      />

      {editingUser && (
        <EditUserModal
          setOpen={setOpen}
          open={open}
          user={editingUser}
          onClose={handleClose}
          onSave={fetchUsers}
        />
      )}
    </div>
  );
};

export default UsersList;

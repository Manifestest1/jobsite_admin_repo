import React, { useState, useEffect } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CButton
} from '@coreui/react';
import { updateUser } from '../../../../src/api_service/apiService';

const EditUserModal = ({ open, user, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null); 

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user, open]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const userData = new FormData();
    userData.append('name', name);
    userData.append('email', email);
    if (image) {
      userData.append('image', image); 
    }
  
    try {
      const response = await updateUser(user.id, userData);
      console.log("Update successful", response);
      onSave(); 
      onClose(); 
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  

  const handleImageChange = (event) => {
    setImage(event.target.files[0]); 
  };

  return (
    <CModal
      visible={open}
      onClose={onClose}
      aria-labelledby="EditUserModalTitle"
    >
      <CModalHeader closeButton>
        <CModalTitle id="EditUserModalTitle">Edit User</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
        <label className="mt-3">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
        <label className="mt-3">Image:</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="form-control"
        />
        <div className="row justify-content-end mt-3">
          <div className="col-auto">
            <CButton color="secondary" onClick={handleSubmit}>Save</CButton>
          </div>
          <div className="col-auto">
            <CButton color="secondary" onClick={onClose}>Cancel</CButton>
          </div>
        </div>
      </CModalBody>
    </CModal>
  );
};

export default EditUserModal;

import React, { useState, useEffect } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CButton
} from '@coreui/react';
import { createMetaTag, updateMetaTag } from '../../../src/api_service/apiService';

const MetaDataModal = ({ open, metaData, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (metaData) {
        setTitle(metaData.title || '');
        setDescription(metaData.description || '');
        setKeywords(metaData.keywords || '');
        setUrl(metaData.url || ''); // Ensure this is set correctly
    } else {
        setTitle('');
        setDescription('');
        setKeywords('');
        setUrl('');
    }
}, [metaData, open]);

useEffect(() => {
}, [title, description, keywords, url]);


const handleSubmit = async (event) => {
    event.preventDefault();
    
  
    if (!title || !description || !keywords || !url) {
      setError("All fields are required.");
      return;
    }
  
    const metaDataObj = { title, description, keywords, url };
  
    try {
      let response;
      if (metaData) {
        response = await updateMetaTag(metaData.id, metaDataObj);
      } else {
        response = await createMetaTag(metaDataObj);
      }
  
      console.log("API Response:", response);
      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving meta data:", error.response?.data || error);
      setError('Failed to save meta data. Please try again.');
    }
  };
  




  return (
      <CModal visible={open} onClose={onClose} aria-labelledby="MetaDataModalTitle">
          <CModalHeader closeButton>
              <CModalTitle id="MetaDataModalTitle">{metaData ? 'Edit Meta Tag' : 'Add Meta Tag'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
              {error && <div className="alert alert-danger">{error}</div>}
              <label>Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
              <label className="mt-3">Description:</label>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" />
              <label className="mt-3">Keywords:</label>
              <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} className="form-control" />
              <label className="mt-3">URL:</label>
              <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="form-control" />
              <div className="row justify-content-end mt-3">
                  <div className="col-auto">
                    <CButton type="button" color="secondary" onClick={handleSubmit}>Save</CButton>
                  </div>
                  <div className="col-auto">
                      <CButton color="secondary" onClick={onClose}>Cancel</CButton>
                  </div>
              </div>
          </CModalBody>
      </CModal>
  );
};

export default MetaDataModal;

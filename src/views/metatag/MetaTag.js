import React, { useState, useEffect } from 'react';
import { showMetaTag, deleteMetaTag } from '../../../src/api_service/apiService';
import MetaDataModal from './MetaDataModal';
import ConfirmDeleteModal from './ConfirmDeleteModal'; // Import the new modal

const MetaTag = () => {
  const [metaDataList, setMetaDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // State for confirmation modal
  const [selectedMeta, setSelectedMeta] = useState(null);
  const [metaToDelete, setMetaToDelete] = useState(null); // State for the meta tag to delete

  useEffect(() => {
    fetchMetaData();
  }, []);

  const fetchMetaData = async () => {
    try {
      const response = await showMetaTag();
      if (response.data && Array.isArray(response.data)) {
        setMetaDataList(response.data);
      } else {
        setError('No meta data found.');
      }
    } catch (error) {
      setError('Error fetching meta data.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (meta) => {
    console.log("Editing meta:", meta.id);
    setSelectedMeta(meta);
    setModalOpen(true);
  };

  const handleDeleteConfirmation = (meta) => {
    setMetaToDelete(meta);
    setConfirmDeleteOpen(true); // Open the confirmation modal
  };

  const handleDelete = async () => {
    if (metaToDelete) {
      try {
        await deleteMetaTag(metaToDelete.id); // Use the ID to delete
        fetchMetaData();
      } catch (error) {
        console.error('Error deleting meta data:', error);
      } finally {
        setConfirmDeleteOpen(false); // Close the confirmation modal
        setMetaToDelete(null); // Reset the meta to delete
      }
    }
  };

  const handleSave = () => {
    fetchMetaData();
    setModalOpen(false);
    setSelectedMeta(null);
  };

  if (loading) {
    return <div>Loading meta tags...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="meta-tag-container">
      <h2>Meta Tag Information</h2>
      <div className="button-container">
        <button className="buttonclass button1" onClick={() => setModalOpen(true)}>Add Meta Tag</button>
      </div>

      {metaDataList.map((meta, index) => (
        <div className="meta-tag-container" key={index}>
          <h3>Meta Tag {index + 1}</h3>
          <div className="meta-tag-info">
            <div><strong>Title:</strong> {meta.title || 'N/A'}</div>
            <div><strong>Description:</strong> {meta.description || 'N/A'}</div>
            <div><strong>Keywords:</strong> {meta.keywords || 'N/A'}</div>
            <div><strong>URL:</strong> {meta.url || 'N/A'}</div>
          </div>
          <div className="action-buttons">
            <button className="buttonclass button2" onClick={() => handleEdit(meta)}>Edit</button>
            <button className="buttonclass button3" onClick={() => handleDeleteConfirmation(meta)}>Delete</button>
          </div>
        </div>
      ))}

      <MetaDataModal open={modalOpen} metaData={selectedMeta} onClose={() => setModalOpen(false)} onSave={handleSave} />
      <ConfirmDeleteModal open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)} onConfirm={handleDelete} />
    </div>
  );
};

export default MetaTag;

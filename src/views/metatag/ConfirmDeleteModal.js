import React from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CButton
} from '@coreui/react';

const ConfirmDeleteModal = ({ open, onClose, onConfirm }) => {
  return (
    <CModal visible={open} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>Confirm Deletion</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Are you sure you want to delete this meta tag?
        <div className="row justify-content-end mt-3">
          <div className="col-auto">
            <CButton className="modal-button confirm-button" onClick={onConfirm}>Confirm</CButton>
          </div>
          <div className="col-auto">
            <CButton className="modal-button cancel-button" onClick={onClose}>Cancel</CButton>
          </div>
        </div>
      </CModalBody>
    </CModal>
  );
};

export default ConfirmDeleteModal;

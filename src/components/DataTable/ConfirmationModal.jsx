import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const ConfirmationModal = ({ onSubmit, onCancel }) => {
  return (
    <Modal isOpen onRequestClose={onCancel} className="data-table__confirmation">
      <h3 className="data-table__confirmation-text">Are you sure?</h3>
      <div className="data-table__confirmation-buttons">
        <button className="data-table__confirmation-button data-table__confirmation-button--yes" onClick={onSubmit}>
          Yes
        </button>
        <button className="data-table__confirmation-button data-table__confirmation-button--no" onClick={onCancel}>
          No
        </button>
      </div>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ConfirmationModal;

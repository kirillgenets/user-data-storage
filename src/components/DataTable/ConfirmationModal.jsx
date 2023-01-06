import PropTypes from 'prop-types';
import Modal from 'react-modal';

const ConfirmationModal = ({ onSubmit, onCancel, error }) => {
  return (
    <Modal isOpen onRequestClose={onCancel} className="data-table__confirmation">
      <h3 className="data-table__confirmation-text">Are you sure?</h3>
      <div className="data-table__confirmation-buttons">
        <button
          className="data-table__confirmation-button data-table__confirmation-button--yes"
          onClick={onSubmit}
        >
          Yes
        </button>
        <button
          className="data-table__confirmation-button data-table__confirmation-button--no"
          onClick={onCancel}
        >
          No
        </button>
      </div>
      {error && <p className="data-table__confirmation-error">{error}</p>}
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ConfirmationModal;

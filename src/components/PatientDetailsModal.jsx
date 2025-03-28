import React from "react";
import { Modal } from "antd";

const PatientDetailsModal = ({
  isViewModalOpen, 
  setIsViewModalOpen,
  viewingPatient,
  getStatusColor,
  darkMode,
}) => {
  const avatarStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "16px",
  };

  const statusDotStyle = {
    backgroundColor: viewingPatient ? getStatusColor(viewingPatient.status) : "transparent",
  };

  return (
    <Modal
      title="Patient Details"
      open={isViewModalOpen}
      onCancel={() => setIsViewModalOpen(false)}
      footer={null} 
      className={darkMode ? "dark-theme" : "light-theme"}
    >
      {viewingPatient && (
        <div className="patient-details">
          {viewingPatient.avatar && (
            <img src={viewingPatient.avatar} alt="avatar" style={avatarStyle} />
          )}

          <p>
            <strong>Name:</strong> {viewingPatient.name}
          </p>
          <p>
            <strong>Email:</strong> {viewingPatient.email}
          </p>
          <p>
            <strong>Age:</strong> {viewingPatient.age}
          </p>
          <p>
            <strong>Condition:</strong> {viewingPatient.condition}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="status-dot" style={statusDotStyle}></span>
            {viewingPatient.status}
          </p>
        </div>
      )}
    </Modal>
  );
};

export default PatientDetailsModal;
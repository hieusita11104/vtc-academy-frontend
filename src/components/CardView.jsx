import React from "react";
import { Avatar, Popconfirm } from "antd";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const CardView = ({ currentPatients, showViewModal, showModal, onDelete, getStatusColor }) => {
  const avatarStyle = {
    backgroundColor: "#1890ff",
    border: "2px solid #40a9ff",
  };

  return (
    <div className="patient-card-container">
      {currentPatients.map((patient) => (
        <div key={patient.id} className="patient-card">
          <div className="patient-card-header">
            {patient.thumbnail ? (
              <img
                src={patient.thumbnail}
                alt="thumbnail"
                className="patient-card-avatar"
              />
            ) : (
              <Avatar size={60} style={avatarStyle}>
                {patient.name.charAt(0).toUpperCase()}
              </Avatar>
            )}
            <div className="patient-card-info">
              <h3>{patient.name}</h3>
              <p>{patient.email}</p>
            </div>
          </div>

          <div className="patient-card-body">
            <p>
              <strong>Age:</strong> {patient.age}
            </p>
            <p>
              <strong>Condition:</strong> {patient.condition}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className="status-dot"
                style={{ backgroundColor: getStatusColor(patient.status) }}
              ></span>
              {patient.status}
            </p>
          </div>

          <div className="patient-card-actions">
            <FaEye
              className="action-icon view-icon"
              onClick={() => showViewModal(patient)}
            />
            <FaEdit
              className="action-icon edit-icon"
              onClick={() => showModal(patient)}
            />
            <Popconfirm
              title="Are you sure to delete this patient?"
              onConfirm={() => onDelete(patient.id)}
            >
              <FaTrash className="action-icon delete-icon" />
            </Popconfirm>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardView;
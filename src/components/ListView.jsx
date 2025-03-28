import React from "react";
import { Popover, Avatar, Popconfirm } from "antd";
import { FaFilter, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Navigate } from "react-router-dom";

const ListView = ({
  currentPatients,
  selectedRowKeys,
  setSelectedRowKeys,
  sortConfig,
  handleSort,
  showViewModal,
  showModal,
  onDelete,
  getStatusColor,
}) => {
  const avatarStyle = {
    backgroundColor: "#1890ff",
    border: "2px solid #40a9ff",
    marginRight: "8px",
    cursor: "pointer",
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort("name")}>
            Name <FaFilter className="filter-icon" />
            {sortConfig.key === "name" && (
              <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
            )}
          </th>
          <th onClick={() => handleSort("email")}>
            Email <FaFilter className="filter-icon" />
            {sortConfig.key === "email" && (
              <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
            )}
          </th>
          <th onClick={() => handleSort("age")}>
            Age <FaFilter className="filter-icon" />
            {sortConfig.key === "age" && (
              <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
            )}
          </th>
          <th onClick={() => handleSort("condition")}>
            Condition <FaFilter className="filter-icon" />
            {sortConfig.key === "condition" && (
              <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
            )}
          </th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {currentPatients.map((patient) => (
          <tr key={patient.id}>
            <td>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={selectedRowKeys.includes(patient.id)}
                  onChange={(e) => {
                    const newSelected = e.target.checked
                      ? [...selectedRowKeys, patient.id]
                      : selectedRowKeys.filter((id) => id !== patient.id);
                    setSelectedRowKeys(newSelected);
                  }}
                  style={{ marginRight: 8 }}
                />
                <Popover
                  content={
                    patient.avatar ? (
                      <img
                        src={patient.avatar}
                        alt="avatar"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Avatar size={100} style={{ backgroundColor: "#1890ff" }}>
                        {patient.name.charAt(0).toUpperCase()}
                      </Avatar>
                    )
                  }
                  trigger="hover"
                >
                  {patient.thumbnail ? (
                    <img
                      src={patient.thumbnail}
                      alt="thumbnail"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginRight: "8px",
                        objectFit: "cover",
                        border: "2px solid #40a9ff",
                      }}
                    />
                  ) : (
                    <Avatar size={40} style={avatarStyle}>
                      {patient.name.charAt(0).toUpperCase()}
                    </Avatar>
                  )}
                </Popover>
                <span>{patient.name}</span>
              </div>
            </td>
            <td>{patient.email}</td>
            <td>{patient.age}</td>
            <td>{patient.condition}</td>
            <td>
              <span
                className="status-dot"
                style={{ backgroundColor: getStatusColor(patient.status) }}
              ></span>
              {patient.status}
            </td>
            <td className="actions">
            <FaEye
  className="action-icon view-icon"
  onClick={() => {
    showViewModal(patient);
  }}
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListView;
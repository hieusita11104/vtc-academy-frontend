// src/components/PatientTable.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import TableHeader from "./TableHeader";
import ListView from "./ListView";
import CardView from "./CardView";
import Pagination from "./Pagination";
import PatientFormModal from "./PatientFormModal";
import PatientDetailsModal from "./PatientDetailsModal";

// Component hiển thị bảng bệnh nhân
const PatientTable = ({
  patients,
  onAdd,
  onEdit,
  onDelete,
  darkMode,
  viewMode,
  setViewMode,
  isViewModalOpen,
  setIsViewModalOpen,
  viewingPatient,
  setViewingPatient,
  setIsNavigating,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [fileList, setFileList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filters, setFilters] = useState({ status: [] });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const patientsPerPage = 12;
  const statusOptions = ["Active", "Inactive", "Pending"];

  const showModal = (patient = null) => {
    setEditingPatient(patient);
    if (patient) {
      form.setFieldsValue(patient);
      setFileList(
        patient.avatar
          ? [{ uid: "-1", name: "avatar.png", status: "done", url: patient.avatar }]
          : []
      );
    } else {
      form.resetFields();
      setFileList([]);
    }
    setIsModalOpen(true);
  };

  const showViewModal = (patient) => {
    setViewingPatient(patient);
    setIsViewModalOpen(true);
    setIsNavigating(true);
    navigate(`/patients/${patient.id}`);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingPatient(null);
    setIsNavigating(true);
    navigate("/patients");
  };

  const getFilteredPatients = () => {
    return patients
      .filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((patient) =>
        filters.status.length > 0 ? filters.status.includes(patient.status) : true
      );
  };

  const getSortedPatients = (filteredPatients) => {
    if (!sortConfig.key) {
      return [...filteredPatients];
    }
    return [...filteredPatients].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];
      if (typeof valueA === "string") {
        return sortConfig.direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA;
    });
  };

  const getPaginationData = (sortedPatients) => {
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = sortedPatients.slice(indexOfFirstPatient, indexOfLastPatient);
    const totalPages = Math.ceil(sortedPatients.length / patientsPerPage);
    return { indexOfFirstPatient, indexOfLastPatient, currentPatients, totalPages };
  };

  const getPageNumbers = (totalPages) => {
    const maxPagesToShow = 5;
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  const handleBulkDelete = () => {
    selectedRowKeys.forEach((id) => onDelete(id));
    message.success("Selected patients deleted successfully!");
    setSelectedRowKeys([]);
  };

  const handleBulkStatusChange = (status) => {
    selectedRowKeys.forEach((id) => {
      const patient = patients.find((p) => p.id === id);
      onEdit(id, { ...patient, status });
    });
    message.success(`Selected patients updated to ${status} status!`);
    setSelectedRowKeys([]);
  };

  const handleAddPatient = (newPatient) => {
    onAdd(newPatient);
    setCurrentPage(1);
    setSortConfig({ key: null, direction: "asc" });
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = (totalPages) => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "green";
      case "inactive":
        return "red";
      default:
        return "orange";
    }
  };

  const filteredPatients = getFilteredPatients();
  const sortedPatients = getSortedPatients(filteredPatients);
  const { indexOfFirstPatient, indexOfLastPatient, currentPatients, totalPages } =
    getPaginationData(sortedPatients);
  const pageNumbers = getPageNumbers(totalPages);

  return (
    <div className={`patient-table ${darkMode ? "dark-theme" : "light-theme"}`}>
      <TableHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        selectedRowKeys={selectedRowKeys}
        handleBulkDelete={handleBulkDelete}
        handleBulkStatusChange={handleBulkStatusChange}
        viewMode={viewMode}
        setViewMode={setViewMode}
        showModal={showModal}
        statusOptions={statusOptions}
      />

      {filteredPatients.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p>No patients found.</p>
        </div>
      ) : (
        <>
          {viewMode === "list" ? (
            <ListView
              currentPatients={currentPatients}
              selectedRowKeys={selectedRowKeys}
              setSelectedRowKeys={setSelectedRowKeys}
              sortConfig={sortConfig}
              handleSort={handleSort}
              showViewModal={showViewModal}
              showModal={showModal}
              onDelete={onDelete}
              getStatusColor={getStatusColor}
            />
          ) : (
            <CardView
              currentPatients={currentPatients}
              showViewModal={showViewModal}
              showModal={showModal}
              onDelete={onDelete}
              getStatusColor={getStatusColor}
            />
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            handlePrevious={handlePrevious}
            handleNext={() => handleNext(totalPages)}
            indexOfFirstPatient={indexOfFirstPatient}
            indexOfLastPatient={indexOfLastPatient}
            filteredPatients={filteredPatients}
            getPageNumbers={() => pageNumbers}
          />
        </>
      )}

      <PatientFormModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingPatient={editingPatient}
        form={form}
        fileList={fileList}
        setFileList={setFileList}
        onAdd={handleAddPatient}
        onEdit={onEdit}
        darkMode={darkMode}
      />

      <PatientDetailsModal
        isViewModalOpen={isViewModalOpen}
        setIsViewModalOpen={handleCloseViewModal}
        viewingPatient={viewingPatient}
        getStatusColor={getStatusColor}
        darkMode={darkMode}
        showModal={showModal}
      />
    </div>
  );
};

export default PatientTable;
import React from "react";
import { Modal, Form, Input, Upload, Button, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { fileToBase64, optimizeImage, createThumbnail, validateImageFile } from "../utils/imageUtils";

const { Option } = Select;

const PatientFormModal = ({
  isModalOpen,
  setIsModalOpen, 
  editingPatient,
  form,
  fileList,
  setFileList,
  onAdd,
  onEdit,
  darkMode,
}) => {
  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      let avatar = editingPatient?.avatar || null;
      let thumbnail = editingPatient?.thumbnail || null;

      if (fileList.length > 0 && fileList[0].originFileObj) {
        const file = fileList[0].originFileObj;
        const validation = validateImageFile(file);
        if (!validation.isValid) {
          message.error(validation.message);
          return;
        }

        const base64 = await fileToBase64(file);
        avatar = await optimizeImage(base64);
        thumbnail = await createThumbnail(avatar);
      }

      const updatedPatient = { ...values, avatar, thumbnail };
      if (editingPatient) {
        onEdit(editingPatient.id, updatedPatient);
        message.success("Patient updated successfully!");
      } else {
        onAdd(updatedPatient);
        message.success("Patient added successfully!");
      }
      setIsModalOpen(false);
      setFileList([]);
    });
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
  };

  return (
    <Modal
      title={editingPatient ? "Edit Patient" : "Add Patient"}
      open={isModalOpen}
      onOk={handleSubmit}
      onCancel={() => setIsModalOpen(false)}
      className={darkMode ? "dark-theme" : "light-theme"}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Avatar">
          <Upload
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
            accept="image/jpeg,image/png"
          >
            <Button icon={<UploadOutlined />}>Upload Avatar</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter the email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please enter the age!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Condition"
          name="condition"
          rules={[{ required: true, message: "Please enter the condition!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select the status!" }]}
        >
          <Select placeholder="Select status">
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PatientFormModal;
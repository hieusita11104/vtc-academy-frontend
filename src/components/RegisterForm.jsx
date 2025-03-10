import { Button, Form, Input, Alert } from 'antd';
import axios from 'axios';
import { useState } from 'react';

const validateMessages = {
  required: {
    username: 'Vui lòng nhập tên đăng nhập!',
    email: 'Vui lòng nhập email!',
    password: 'Vui lòng nhập mật khẩu!',
  },
  minLength: {
    username: 'Tên đăng nhập phải có ít nhất 4 ký tự!',
    password: 'Mật khẩu phải có ít nhất 6 ký tự!',
  },
  email: 'Email không hợp lệ!',
};

const handleFinish = async (
  values,
  setErrorMessage,
  setSuccessMessage,
  form
) => {
  try {
    setErrorMessage('');
    setSuccessMessage('');

    const response = await axios.post(
      'https://api.example.com/register',
      values
    );

    if ([200, 201].includes(response.status) || response.data.success) {
      setSuccessMessage(
        'Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.'
      );
      form.resetFields();
    } else {
      setErrorMessage('Đăng ký không thành công. Vui lòng thử lại!');
    }
  } catch (error) {
    if (error.response && error.response.data) {
      setErrorMessage(
        error.response.data.message || 'Có lỗi xảy ra khi đăng ký.'
      );
    } else {
      setErrorMessage('Không thể kết nối đến máy chủ. Vui lòng thử lại sau!');
    }
  }
};

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  return (
    <div style={{ maxWidth: 600 }}>
      <h1 className='text-lg font-semibold text-black'>
        Exercise 4: API Form Submission
      </h1>
      <p className='my-4'>
        Form đăng ký tài khoản với xử lý dữ liệu lên API và hiển thị thông báo
        lỗi
      </p>

      {errorMessage && (
        <Alert
          message='Lỗi'
          description={errorMessage}
          type='error'
          showIcon
          style={{ marginBottom: 10 }}
        />
      )}

      {successMessage && (
        <Alert
          message='Thành công'
          description={successMessage}
          type='success'
          showIcon
          style={{ marginBottom: 10 }}
        />
      )}

      <Form
        form={form}
        layout='vertical'
        onFinish={(values) =>
          handleFinish(values, setErrorMessage, setSuccessMessage, form)
        }
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name='username'
          label='Tên đăng nhập'
          rules={[
            { required: true, message: validateMessages.required.username },
            { min: 4, message: validateMessages.minLength.username },
          ]}
        >
          <Input placeholder='Nhập tên đăng nhập' />
        </Form.Item>

        <Form.Item
          name='email'
          label='Email'
          rules={[
            { required: true, message: validateMessages.required.email },
            { type: 'email', message: validateMessages.email },
          ]}
        >
          <Input placeholder='Nhập email' />
        </Form.Item>

        <Form.Item
          name='password'
          label='Mật khẩu'
          rules={[
            { required: true, message: validateMessages.required.password },
            { min: 6, message: validateMessages.minLength.password },
          ]}
        >
          <Input.Password placeholder='Nhập mật khẩu' />
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          Đăng ký
        </Button>
      </Form>
    </div>
  );
};

export default RegisterForm;
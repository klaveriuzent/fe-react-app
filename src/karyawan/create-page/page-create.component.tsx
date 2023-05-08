import React from 'react';
import axios from 'axios';
import { Typography, Space, Button, Form, Input, InputNumber, Select, message } from 'antd';


const { Title } = Typography
const options = [{ value: 'Lead' }, { value: 'Developer' }, { value: 'Marketing' }, { value: 'Support' }];

export const PageCreateComponent = () => {

  const onFinish = (values: any) => {
    axios
      .post('http://localhost:3004/karyawan', values)
      .then(message.success('Data Berhasil direkam', 15));
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Data tidak valid, silahkan cek kembali');
  };

  return (
    <Space
      direction="vertical"
      size="small"
    >
      <Title>Tambah Data</Title>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </p>
      <br />
      <Form
        name="basic"
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 6,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Kolom nama wajib diisi!',
            },
          ]}
        >
          <Input allowClear={true} />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[
            {
              required: true,
              message: 'Kolom umur wajib diisi!',
            },
          ]}
        >
          <InputNumber min={17} max={45} defaultValue={18} />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[
            {
              required: true,
              message: 'Role wajib diisi!',
            },
          ]}
        >
          <Select
            mode="multiple"
            showArrow
            options={options}
            allowClear={true}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
        >
          <Input allowClear={true} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 2,
            span: 4,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
}
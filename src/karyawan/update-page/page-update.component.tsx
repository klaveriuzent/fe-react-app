import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Space, Form, Input, InputNumber, Button, Select, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { IUserData } from '../list-page/page-audit';

const { Title } = Typography;
const options = [{ value: 'Lead' }, { value: 'Developer' }, { value: 'Marketing' }, { value: 'Support' }];

export const PageUpdateComponent = () => {
  const { id } = useParams<{ id: string }>()
  const [IUserData, setIUserData] = useState<Array<IUserData>>()
  const [editForm] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = () => {
    const payload = editForm.getFieldsValue()
    axios
      .put(`http://localhost:3004/karyawan/${id}`, payload)
      .then(message.success('Data Berhasil direkam'));
    navigate('/karyawan/data')
    console.log('Success:', payload);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Data tidak valid, silahkan cek kembali');
  };

  function getData(id: string) {
    axios
      .get(`http://localhost:3004/karyawan/${id}`)
      .then(response => {
        if (response.status === 200) {
          setIUserData(response.data)
          editForm.setFieldsValue(response.data)
          console.log(response.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getData(id!)
  }, [])

  return (
    <Space
      direction="vertical"
      size="small"
    >
      <Title>Update Data Karyawan</Title>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </p>
      <br />
      <Form
        name="basic"
        form={editForm}
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
          <Input

          />
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
          <InputNumber min={17} max={45} />
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
          <Button
            type="primary"
            htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
}
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Space, Form, Input, DatePicker, Button, Select, message } from 'antd';
import { IAbsensiData } from '../absensi-list/page-absensi';
import moment from 'moment';


const { Title } = Typography;
const { TextArea } = Input;
const optionsStatus = [{ value: 'Masuk' }, { value: 'Izin' }, { value: 'Sakit' }];

export const PageUpdateAbsensi = () => {
  const {id} = useParams<{id:string}>()
  const [ IAbsensiData, setIAbsensiData ] = useState<Array<IAbsensiData>>()
  const [ absensiForm ] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = () => {
    const payload = absensiForm.getFieldsValue()
    axios
      .put(`http://localhost:3004/absensi/${id}`, payload)
      .then(message.success('Data Berhasil direkam'));
      navigate('/absensi/data');
    console.log('Success:', payload);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Data tidak valid, silahkan cek kembali');
  };

  function disabledDate(current) {
    const start = moment("DD-MM-YYYY");
    return current < start || current > moment();
  }

  function getData(id: string) {
    axios
      .get(`http://localhost:3004/absensi/${id}`)
      .then(response => {
        if (response.status === 200) {
          const absensi = Object.assign({}, response.data);
          if (absensi.date) {
            absensi.date = moment(absensi.date);
          } else {
            delete absensi.date;
          }
          setIAbsensiData(absensi)
          absensiForm.setFieldsValue(absensi)
          console.log(absensi)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getData(id!);
  }, [])

  return(
    <Space
      direction="vertical"
      size="small"
    >
      <Title>Absensi</Title>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </p>
      <br />
      <Form
        name="basic"
        form={absensiForm}
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
              message: 'Nama wajib diisi!',
            },
          ]}
        >
          <Input

          />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: 'Tanggal wajib diisi!',
            },
          ]}
        >
          <DatePicker
            format="L"
            disabledDate={disabledDate}
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
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
            options={optionsStatus}
            allowClear={true}
          />
        </Form.Item>

        <Form.Item
          label="Keterangan"
          name="keterangan"
        >
          <TextArea
            showCount
            maxLength={100}
          />
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Space, Form, Input, DatePicker, Button, Select, message, AutoComplete } from 'antd';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { TextArea } = Input;
const optionsStatus = [{ value: 'Masuk' }, { value: 'Izin' }, { value: 'Sakit' }];

export const PageCreateAbsensi = () => {
  const [ArrayNama, setArrayNama] = useState<any[]>()
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    axios
      .post('http://localhost:3004/absensi', values)
      .then(message.success('Data Berhasil direkam', 15));
      navigate('/absensi/data');
      console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Data tidak valid, silahkan cek kembali');
  };

  function disabledDate(current) {
    const start = moment("DD-MM-YYYY");
    return current < start || current > moment();
  }

  async function getData() {
    axios
      .get('http://localhost:3004/karyawan')
      .then(response => {
        if (response.status === 200) {
          setArrayNama(
            response.data.map((karyawan) => {
              console.log('Nama : ',karyawan.name)
              return {
                value: karyawan.name,
                label: karyawan.name,
              }
            }
            )
          )
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  // const options = [
  //   {
  //     label: 'Burns Bay Road',
  //     value: 'Burns Bay Road',
  //   },
  //   {
  //     label: 'Downing Street',
  //     value: 'Downing Street',
  //   },
  //   {
  //     label: 'Wall Street',
  //     value: 'Wall Street',
  //   },
  // ].map((karyawan) => { return { label: karyawan.name, value: karyawan.name } })
  //   ;

  useEffect(() => {
    getData()
  }, [])

  return (
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
          <AutoComplete
            style={{
              width: 390,
            }}
            options={ArrayNama}
            filterOption={(inputValue, option: any) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
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
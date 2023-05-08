import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'moment';
import { IAbsensiData } from './page-absensi';
import { Table, Space, Button, message, Modal, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const { Title } = Typography;
const { confirm } = Modal;

export const PageAbsensiComponent = () => {
  const [IAbsensiData, setIAbsensiData] = useState<Array<IAbsensiData>>()
  const [isListLoading, setIsListLoading] = useState(false)

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (dt: string) => (
        Moment(dt).format('L')
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Keterangan',
      dataIndex: 'keterangan',
      key: 'keterangan',
    },
    {
      title: 'Action',
      key: 'action',
      render: (row: any) => {
        console.log(row);
        return (
          <Space size="middle">
            <Button
              type="primary"
              href={"/absensi/data/update/" + row.id}
            >
              Edit</Button>
            <Button
              type="primary"
              danger
              onClick={() => showDeleteConfirm(row)}
            >
              Delete</Button>
          </Space>
        );
      },
    },
  ];

  function showDeleteConfirm(row: any) {
    confirm({
      title: 'Hapus Data !',
      icon: <ExclamationCircleOutlined />,
      content: `Apakah Anda yakin ingin menghapus data ?`,
      okText: 'Hapus',
      okType: 'danger',
      cancelText: 'Batal',
      onOk() {
        handleDelete(row.id);
        console.log('Data Deleted')
      },
      onCancel() {
        console.log('Cancel Delete');
      },
    });
  }

  function handleDelete(id: any) {
    axios
      .delete(`http://localhost:3004/absensi/${id}`)
      .then( () => {
        message.success('Data Berhasil dihapus', 10);
        getData();
      }
      )
      .catch(err => {
        console.log(err);
      });
      getData();
  }

  async function getData() {
    console.log('test')
    setIsListLoading(true)
    axios
      .get('http://localhost:3004/absensi')
      .then(response => {
        if (response.status === 200) {
          setIAbsensiData(response.data)
          setIsListLoading(false)
        }
      })
      .catch(err => {
        console.log(err)
        setIsListLoading(false)
      })
  }

  useEffect(() => {
    getData()
  }, [IAbsensiData])

  return (
    <Space
      direction="vertical"
      size="small"
    >
      <Title>Data Absensi</Title>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </p>
      <br />

      <Table
        columns={columns}
        dataSource={IAbsensiData}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 8,
        }}
      >
      </Table>

    </Space>

  );
}
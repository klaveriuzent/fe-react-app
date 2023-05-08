import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IUserData } from './page-audit';
import { Typography, Space, Tag, Table, Button, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { confirm } = Modal;

export const PageAuditComponent = () => {
  const [IUserData, setIUserData] = useState<Array<IUserData>>()
  const [isListLoading, setIsListLoading] = useState(false)

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      render: (tags: any) => (
        <>
          {tags.map((tag: string) => {
            let color = 'default';
            if (tag === 'Developer') {
              color = 'green';
            }
            else if (tag === 'Lead') {
              color = 'volcano';
            }
            else if (tag === 'Marketing') {
              color = 'cyan';
            }
            else if (tag === 'Support') {
              color = 'geekblue';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
              href={"/karyawan/data/update/" + row.id}
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
      content: `Apakah Anda yakin ingin menghapus data ${row.name} ?`,
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
      .delete(`http://localhost:3004/karyawan/${id}`)
      .then(message.success('Data Berhasil dihapus', 10))
      .catch(err => {
        console.log(err);
      })
  }

  async function getData() {
    setIsListLoading(true)
    axios
      .get('http://localhost:3004/karyawan')
      .then(response => {
        if (response.status === 200) {
          setIUserData(response.data)
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
  }, [IUserData])

  return (
    <Space
      direction="vertical"
      size="small"
    >
      <Title>Audit Karyawan</Title>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </p>
      <br />
      <Table
        columns={columns}
        dataSource={IUserData}
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
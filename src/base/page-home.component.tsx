import React, {useState} from 'react';
import { Typography, Space, Timeline, Tag } from 'antd';
import { JsonServerStatus } from '../json-server-status';
import { useEffect } from 'react';

const { Title, Text } = Typography;
const sserver = new JsonServerStatus()

export const PageHomeComponent = () => {

  //Json Server Status
  const [isServerOn, setIsServerOn] = useState(false)
  const JsonServerStatus = (props: { serverOn: boolean }) => {
    if (props.serverOn) {
      return (
        <Tag color="green">Running</Tag>
      )
    }
    else {
      return (
        <Tag color="red">failure</Tag>
      )
    }
  }
  async function getServerStatus() {
    let status = await sserver.isServerOn()
    setIsServerOn(status)
  }

  useEffect(() => {
    getServerStatus()
  }, )

  return (
    <Space
      direction="vertical"
      size="small"
    >
      <Title>Home</Title>
      <p>
        Don't forget to make sure the json-server is active when starting the demo.<br />
        To start the json-server the port is <Text code>3004</Text>, follow the timeline below for steps.<br /><br />
      </p>
      <Timeline>
        <Timeline.Item>
          <p
            style={{ fontWeight: 'bold' }}
          >Running Main Project</p>
          <p>Open Terminal then send "npm run start"</p>
        </Timeline.Item>

        <Timeline.Item>
          <p
            style={{ fontWeight: 'bold' }}
          >Running Server at 3004</p>
          <p>Open New Terminal then send "json-server --watch db.json --port 3004"</p>
        </Timeline.Item>

        <Timeline.Item>
          <p
            style={{ fontWeight: 'bold' }}
          >Status</p>
          <p>
            <Tag color="green">Running</Tag> Main Project
          </p>
          <p>
            <JsonServerStatus serverOn={isServerOn} /> Server Port 3004
          </p>
        </Timeline.Item>
      </Timeline>
    </Space>
  )
}
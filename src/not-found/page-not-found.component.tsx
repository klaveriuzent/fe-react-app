import React from "react";
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';
import { Link } from "react-router-dom";

export const PageNotFoundComponent = () => {
  return (
    <Result
      status="404"
      style={{ padding: 200 }}
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra=
      {
        <Link to="/">
          <Button
          type="primary"
          shape="round">Back Home</Button>
        </Link>
      }
    />
  )
}
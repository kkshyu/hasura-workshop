import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";

import { createApolloClient } from "./utils";
import ProductListPage from "./pages/ProductListPage";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const App = () => {
  const [apolloClient, setApolloClient] = useState();
  const onFinish = (values) => {
    axios
      .post(process.env.REACT_APP_BACKEND + "/login", {
        username: values.username,
        password: values.password,
      })
      .then(({ data }) => {
        setApolloClient(createApolloClient(data.token));
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container">
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <hr />
      {apolloClient && (
        <ApolloProvider client={apolloClient}>
          <ProductListPage />
        </ApolloProvider>
      )}
    </div>
  );
};

export default App;

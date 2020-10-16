import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Typography, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { userStateType } from '../../../reducers/user';
import { login } from '../../../actions/auth';
import { Redirect, Link } from 'react-router-dom';
const { Sider, Content } = Layout;
const { Title, Text } = Typography;

function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  // @ts-expect-error
  const user: userStateType = useSelector(state => state.user);
  const { isAuthenticated } = user;

  const onFinish = async (values: any) => {
    setIsLoading(true);
    await login(values, dispatch);
    setIsLoading(false);
  };

  if (isAuthenticated && !isLoading) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Layout>
        <Sider className="Auth__sider Auth__sider--login">
          <div className="Auth__sider-content Auth__sider-content--login">
            <Title>Pluto</Title>
            <Text>Be like pluto, stand out from the rest.</Text>
            <br/>
          </div>
        </Sider>
        <Layout>
          <Sider className="Auth__sider Auth__sider2">
            <div className="Auth__sider2-content">
              <div>
                <div className="Auth__sider-content--lockButton">
                  <LockOutlined/>
                  <Title level={3}>Sign in to Pluto</Title>
                </div>
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input readOnly={isLoading} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input
                      readOnly={isLoading}
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button loading={isLoading} style={{ width: '100%', marginBottom: '10px' }} type="primary" htmlType="submit" className="login-form-button">
                      Sign in
                    </Button>
                    <Link to="/signup" >Don't have an account? Sign Up</Link>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Sider>
          <Content className="Auth__content Auth__content-login">
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Login;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Typography, Form, Input, Button } from 'antd';
import {
  ItalicOutlined,
  SmileOutlined,
  UserOutlined,
  LockOutlined,
  BankOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { userStateType } from '../../../reducers/user';
import { signup } from '../../../actions/user';
import { Redirect, Link } from 'react-router-dom';
const { Sider, Content } = Layout;
const { Title, Text } = Typography;

function SignUp() {
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  // @ts-expect-error
  const user: userStateType = useSelector(state => state.user);
  const { isAuthenticated } = user;

  const onFinish = async (values: any) => {
    setIsLoading(true);
    await signup(values, dispatch);
    setIsLoading(false);
  };

  if (isAuthenticated && !isLoading) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Layout>
        <Sider className="Auth__sider">
          <div className="Auth__sider-content">
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
                  <Title level={3}>Sign up to Pluto</Title>
                </div>
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                  >
                    <Input
                      readOnly={isLoading}
                      prefix={<ItalicOutlined className="site-form-item-icon" />}
                      placeholder="Name"
                    />
                  </Form.Item>
                  <Form.Item
                    name="avatar"
                    style={{ display: 'inline-block', width: 'calc(50%)', margin: '0 0 0 8px' }}
                  >
                    <Input
                      readOnly={isLoading}
                      prefix={<SmileOutlined className="site-form-item-icon" />}
                      placeholder="Avatar link"
                    />
                  </Form.Item>
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input
                      readOnly={isLoading}
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Username"
                    />
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
                  <Form.Item
                    name="college"
                    rules={[{ required: true, message: 'Please input your college name!' }]}
                  >
                    <Input
                      readOnly={isLoading}
                      prefix={<BankOutlined className="site-form-item-icon" />}
                      placeholder="College name"
                    />
                  </Form.Item>
                  <Form.Item
                    name="location"
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                  >
                    <Input
                      readOnly={isLoading}
                      prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                      placeholder="Where do you live?"
                    />
                  </Form.Item>
                  <Form.Item
                    name="website"
                    style={{ display: 'inline-block', width: 'calc(50%)', margin: '0 0 0 8px' }}
                  >
                    <Input
                      readOnly={isLoading}
                      prefix={<GlobalOutlined className="site-form-item-icon" />}
                      placeholder="Your website link"
                    />
                  </Form.Item>
                  <Form.Item
                    name="linkedin"
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                  >
                    <Input
                      readOnly={isLoading}
                      prefix={<LinkedinOutlined className="site-form-item-icon" />}
                      placeholder="Your LinkedIn"
                    />
                  </Form.Item>
                  <Form.Item
                    name="github"
                    style={{ display: 'inline-block', width: 'calc(50%)', margin: '0 0 0 8px' }}
                  >
                    <Input
                      readOnly={isLoading}
                      prefix={<GithubOutlined className="site-form-item-icon" />}
                      placeholder="Your GitHub"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button loading={isLoading} style={{ width: '100%', marginBottom: '10px' }} type="primary" htmlType="submit" className="login-form-button">
                      Sign up
                    </Button>
                    <Link to="/signin" >Already have an account? Sign in</Link>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Sider>
          <Content className="Auth__content Auth__content-signup">
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default SignUp;

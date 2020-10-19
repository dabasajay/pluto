import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Layout, Button, Form, Input, Typography, notification } from 'antd';
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
import Navbar from '../../components/Navbar';
import './profile.css';
import { useHistory } from 'react-router-dom';
import API from '../../api';
import { userStateType } from '../../reducers/user';
const { Header, Sider, Content } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

function Profile() {
  // @ts-expect-error
  const user: userStateType = useSelector(state => state.user);
  const { id } = user;
  const history = useHistory();
  const [isProfileLoading, setIsProfileLoading] = React.useState(true);
  const [isPasswordFormLoading, setPasswordFormIsLoading] = React.useState(false);
  const [isProfileFormLoading, setIsProfileFormLoading] = React.useState(false);
  const [profile, setProfile] = React.useState({
    id: null,
    name: null,
    avatar: null,
    username: null,
    bio: null,
    location: null,
    college: null,
    website: null,
    linkedin: null,
    github: null,
  });

  const onFinishPasswordForm = async (values: any) => {
    setPasswordFormIsLoading(true);
    // await signup(values, dispatch);
    setPasswordFormIsLoading(false);
  };

  const onFinishProfileForm = async (values: any) => {
    setIsProfileFormLoading(true);
    const res = await API.user.get(`/${id}`);
    if (res.message == null) {
      const { user } = res;
      console.log(user);
      setProfile({ ...user });
      setIsProfileLoading(false);
    } else {
      notification.open({
        message: 'Error',
        description: res.message,
      });
    }
    setIsProfileFormLoading(false);
  };

  useEffect(() => {
    async function work() {
      const res = await API.user.get(`/${id}`);
      if (res.message == null) {
        const { user } = res;
        console.log(user);
        setProfile({ ...user });
        setIsProfileLoading(false);
      }
    }
    work();
    // eslint-disable-next-line
  }, [])

  let content = null;

  if (isProfileLoading) {
    content = <div>Loading profile. Please wait</div>
  } else {
    content = (
      <>
        <Sider className="Profile__sider">
          <Title level={2}>Credentials</Title>
          <Form
            name="password_form"
            className="login-form"
            initialValues={{
              // remember: true,
              ...profile
            }}
            onFinish={onFinishPasswordForm}
          >
            <Form.Item
              name="username"
            >
              <Input
                readOnly
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input the new password!' }]}
            >
              <Input
                readOnly={isPasswordFormLoading}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="New password"
              />
            </Form.Item>
            <Form.Item>
              <Button loading={isPasswordFormLoading} style={{ width: '100%', marginBottom: '10px' }} type="primary" htmlType="submit" className="login-form-button">
                Change password
              </Button>
            </Form.Item>
          </Form>
        </Sider>
        <Content className="Profile__content">
          <Title level={2}>Account Information</Title>
          <Form
            name="profile_form"
            className="login-form"
            initialValues={{
              remember: true,
              ...profile
            }}
            onFinish={onFinishProfileForm}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
              <Input
                readOnly={isProfileFormLoading}
                prefix={<ItalicOutlined className="site-form-item-icon" />}
                placeholder="Name"
              />
            </Form.Item>
            <Form.Item
              name="avatar"
              style={{ display: 'inline-block', width: 'calc(50%)', margin: '0 0 0 8px' }}
            >
              <Input
                readOnly={isProfileFormLoading}
                prefix={<SmileOutlined className="site-form-item-icon" />}
                placeholder="Avatar link"
              />
            </Form.Item>
            <Form.Item
              name="college"
              rules={[{ required: true, message: 'Please input your college name!' }]}
            >
              <Input
                readOnly={isProfileFormLoading}
                prefix={<BankOutlined className="site-form-item-icon" />}
                placeholder="College name"
              />
            </Form.Item>
            <Form.Item
              name="bio"
            >
              <TextArea
                readOnly={isProfileFormLoading}
                rows={4}
                style={{ resize: 'none' }}
                placeholder="Tell us about yourself..."
              />
            </Form.Item>
            <Form.Item
              name="location"
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
              <Input
                readOnly={isProfileFormLoading}
                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                placeholder="Where do you live?"
              />
            </Form.Item>
            <Form.Item
              name="website"
              style={{ display: 'inline-block', width: 'calc(50%)', margin: '0 0 0 8px' }}
            >
              <Input
                readOnly={isProfileFormLoading}
                prefix={<GlobalOutlined className="site-form-item-icon" />}
                placeholder="Your website link"
              />
            </Form.Item>
            <Form.Item
              name="linkedin"
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
              <Input
                readOnly={isProfileFormLoading}
                prefix={<LinkedinOutlined className="site-form-item-icon" />}
                placeholder="Your LinkedIn"
              />
            </Form.Item>
            <Form.Item
              name="github"
              style={{ display: 'inline-block', width: 'calc(50%)', margin: '0 0 0 8px' }}
            >
              <Input
                readOnly={isProfileFormLoading}
                prefix={<GithubOutlined className="site-form-item-icon" />}
                placeholder="Your GitHub"
              />
            </Form.Item>

            <Form.Item>
              <Button loading={isProfileFormLoading} style={{ width: '100%', marginBottom: '10px' }} type="primary" htmlType="submit" className="login-form-button">
                Save profile
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </>
    );
  }

  return (
    <Layout>
      <Navbar />
      <Header className="Profile__header">
        <div>
          <Button onClick={() => history.push(`/user/${id}`)}>View public profile</Button>
        </div>
      </Header>
      <Layout>
        {content}
      </Layout>
    </Layout>
  );
}

export default Profile;

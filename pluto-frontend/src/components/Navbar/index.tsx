import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  FireOutlined,
  SearchOutlined,
  HeartOutlined,
  SmileOutlined,
  AppstoreAddOutlined,
  ApiOutlined,
} from '@ant-design/icons';
import './Navbar.css';
import { userStateType } from '../../reducers/user';
import { logout } from '../../actions/auth';
const { Header } = Layout;
const { SubMenu } = Menu;

function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();
  // @ts-expect-error
  const user: userStateType = useSelector(state => state.user);
  const { isAuthenticated } = user;
  let contents = null;
  if (isAuthenticated) {
    contents = (
      <>
        <Menu.Item key="1" icon={<FireOutlined />} onClick={() => history.push('/hot')} >Hot projects</Menu.Item>
        <Menu.Item key="2" icon={<SearchOutlined />} onClick={() => history.push('/search')} >Search projects</Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="Account">
          <Menu.Item key="3" icon={<SmileOutlined />} onClick={() => history.push('/profile')} >Profile</Menu.Item>
          <Menu.Item key="4" icon={<AppstoreAddOutlined />} onClick={() => history.push('/myprojects')} >My projects</Menu.Item>
          <Menu.Item key="5" icon={<HeartOutlined />} onClick={() => history.push('/liked')} >Liked projects</Menu.Item>
          <Menu.Item key="6" icon={<ApiOutlined />} onClick={() => dispatch(logout())} >Logout</Menu.Item>
        </SubMenu>
      </>
    );
  } else {
    contents = (
      <>
        <Menu.Item key="1" icon={<FireOutlined />} onClick={() => history.push('/hot')} >Hot projects</Menu.Item>
        <Menu.Item key="2" icon={<SearchOutlined />} onClick={() => history.push('/search')} >Search projects</Menu.Item>
        <Menu.Item key="3" onClick={() => history.push('/signin')} >Sign in</Menu.Item>
        <Menu.Item key="4" onClick={() => history.push('/signup')} >Sign up</Menu.Item>
      </>
    );
  }
  return (
    <Header className="Navbar">
      <Link to='/' className="Navbar__logo">
        Pluto
      </Link>
      <div className="Navbar__items">
        <Menu mode="horizontal">
          {contents}
        </Menu>
      </div>
    </Header>
  );
}

export default Navbar;
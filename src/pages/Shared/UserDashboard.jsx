import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router';
import axios from 'axios';
import { Layout, Menu, theme } from 'antd';
import {
  EditOutlined,
  EyeOutlined,
  HeartOutlined,
  ContactsOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';

const { Header, Content, Sider } = Layout;

const UserDashboard = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [biodataId, setBiodataId] = useState(null);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://match-finder-server.vercel.app/biodata/user/${user.email}`)
        .then(res => {
          if (res.data?.biodataId) {
            setBiodataId(res.data.biodataId);
          }
        })
        .catch(err => {
          console.error('Failed to fetch biodata ID', err);
        });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    {
      key: '1',
      icon: <EditOutlined />,
      label: <Link to="edit-biodata">Edit Biodata</Link>,
    },
    {
      key: '2',
      icon: <EyeOutlined />,
      label: biodataId ? (
        <Link to={`view-biodata/${biodataId}`}>View Biodata</Link>
      ) : (
        <span style={{ color: '#ccc' }}>View Biodata</span>
      ),
    },
    {
      key: '3',
      icon: <ContactsOutlined />,
      label: <Link to="contact-requests">My Contact Requests</Link>,
    },
    {
      key: '4',
      icon: <HeartOutlined />,
      label: <Link to="favorites">Favorites Biodata</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={250}
        style={{
          background: colorBgContainer,
          borderRight: '1px solid #f0f0f0'
        }}
      >
        <div className="demo-logo-vertical" style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <h3 style={{ margin: 0 }}>User Dashboard</h3>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
          style={{ height: '100%', borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header style={{
          padding: 0,
          background: colorBgContainer,
          borderBottom: '1px solid #f0f0f0'
        }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: '8px'
          }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;

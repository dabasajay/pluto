import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Statistic, Button, Skeleton } from 'antd';
import Navbar from '../../components/Navbar';
import './landing.css'
import API from '../../api';
const { Footer, Sider, Content } = Layout;

function Landing() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [stats, setStats] = React.useState({
    users: 0,
    projects: 0
  })
  const history = useHistory();
  useEffect(() => {
    async function work() {
      const res = await API.agg.get('/count/userandproject');
      if (res.message == null) {
        const { users, projects } = res;
        setStats({ users, projects });
        setIsLoading(false);
      }
    }
    work();
  }, [])
  return (
    <Layout>
      <Navbar />
      <Layout>
        <Sider className="Landing__sider">
          {/* <Statistic title="Users" value={112893} /> */}
          {
            isLoading
            ?
            (
              <>
                <Skeleton active paragraph={{ rows: 1 }}/>
                <Skeleton active paragraph={{ rows: 1 }}/>
              </>
            ):
            (
              <>
                <Statistic title="Users" value={stats.users} />
                <Statistic title="Projects" value={stats.projects} />
              </>
            )
          }
          <Button onClick={() => history.push('/search')} style={{ marginTop: 16 }} type="primary">
            Browse projects
          </Button>
        </Sider>
        <Content className="Landing__content">
        </Content>
      </Layout>
      <Footer className="Landing__footer">
        <a href='https://www.freepik.com/vectors/design'>Design vector created by freepik - www.freepik.com</a>
      </Footer>
    </Layout>
  );
}

export default Landing;

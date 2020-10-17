import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar';
import API from '../../api';
import { ProjectsGridSkeleton, ProjectsGrid } from '../../components/ProjectsGrid';
import './hot.css';
const { Content } = Layout;

function Hot() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [projects, setProjects] = React.useState([]);
  useEffect(() => {
    async function work() {
      const res = await API.project.get('/hot');
      if (res.message == null) {
        const { users, projects } = res;
        setProjects(projects);
        setIsLoading(false);
      }
    }
    work();
  }, [])
  return (
    <Layout>
      <Helmet>
        <title>Hot Projects</title>
      </Helmet>
      <Navbar />
      <Content className="Hot__content">
        {
          isLoading
          ?
          <ProjectsGridSkeleton count={8} />
          :
          <ProjectsGrid projects={projects} />
        }
      </Content>
    </Layout>
  );
}

export default Hot;

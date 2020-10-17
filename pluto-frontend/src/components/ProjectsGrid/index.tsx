import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Skeleton, Row, Col } from 'antd';
import { HeartFilled, WechatFilled } from '@ant-design/icons';
import './ProjectsGrid.css';
const { Meta } = Card;

function ProjectCardSkeleton() {
  return (
    <Card
      className="ProjectCardSkeleton__card"
      cover={
        <Skeleton.Image />
      }
      actions={[
        <Skeleton.Avatar active size='small' shape='circle' />,
        <Skeleton.Avatar active size='small' shape='circle' />,
      ]}
    >
      <Skeleton active paragraph={{ rows: 1 }}/>
    </Card>
  );
}

function ProjectsGridSkeleton({ count } : { count: number }) {
  const contents: JSX.Element[] = [];
  const projects = Array.from({length: count}, (v, i) => i);
  let i = 0;
  while (i < count) {
    const row = projects.slice(i, i + 4);
    contents.push(
      <Row key={i} gutter={[16, 16]}>
        {
          row.map((col, idx) => <Col key={idx+1} span={6} ><ProjectCardSkeleton /></Col>)
        }
      </Row>
    );
    i += 4;
  }
  return (
    <>
      {[...contents]}
    </>
  );
}

type ProjectType = {
  id: number;
  name: string;
  url: string;
  shortDesc: string;
  likes: number;
  comments: number;
}

const backgroundColors = [
  'blue',
  'pink',
  'red',
  'orange',
]

function ProjectCard({ data } : { data: ProjectType }) {
  const { id, name, url, shortDesc, likes, comments } = data;
  const history = useHistory();
  const cover = url != null ? (
    <img
      alt="project-image"
      src={url}
    />
  ) : (
    <div className={`ProjectCard__card-defaultProjectImage background-color-${backgroundColors[Math.floor(Math.random() * backgroundColors.length)]}`}/>
  );
  return (
    <Card
      hoverable
      onClick={() => {
        history.push(`/project/${id}`);
      }}
      className="ProjectCard__card"
      cover={cover}
      actions={[
        <span><HeartFilled key="likes" /> {likes.toLocaleString()}</span>,
        <span><WechatFilled key="comments" /> {comments.toLocaleString()}</span>,
      ]}
    >
      <Meta
        title={name}
        description={shortDesc}
      />
    </Card>
  );
}

function ProjectsGrid({ projects }: { projects: ProjectType[] }) {
  const contents: JSX.Element[] = [];
  let i = 0;
  while (i < projects.length) {
    const row = projects.slice(i, i + 4);
    contents.push(
      <Row key={i} gutter={[16, 16]}>
        {
          row.map((col, idx) => <Col key={idx+1} span={6} ><ProjectCard data={col} /></Col>)
        }
      </Row>
    );
    i += 4;
  }
  return (
    <>
      {[...contents]}
    </>
  );
}

export { ProjectsGridSkeleton, ProjectsGrid };
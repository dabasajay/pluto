import React from 'react';
import { useParams } from 'react-router-dom';

function Project() {
  const { projectId } = useParams<{ projectId: string; }>();
  const id = parseInt(projectId, 10);
  return (
    <div>
      Project - {id}
    </div>
  );
}

export default Project;

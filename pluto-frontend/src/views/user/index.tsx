import React from 'react';
import { useParams } from 'react-router-dom';

function User() {
  const { userId } = useParams<{ userId: string; }>();
  const id = parseInt(userId, 10);
  return (
    <div>
      User - {id}
    </div>
  );
}

export default User;

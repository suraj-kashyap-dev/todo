import React from 'react';
import { useParams } from 'react-router-dom';

const Workspaces: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>Workspace ID: {id}</div>
    );
};

export default Workspaces;

import React, { useEffect, useState } from 'react';
import Dropdown from '../ui/Dropdown';
import { BriefcaseBusiness } from 'lucide-react';
import { useWorkspaceApi } from '../../hooks/useWorkspaceApi';
import { showToast } from '../../utils/toast';
import { Workspace } from '../../types/workspace.types';

const WorkspaceSwitcher: React.FC = () => {
    const { workspace, getWorkspace, loading, error } = useWorkspaceApi();
    const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace>();

    useEffect(() => {
        getWorkspace();
    }, []);

    useEffect(() => {
        if (error) showToast(error, { type: 'error' });
    }, [error]);

    const changeWorkspace = (workspace: Workspace) => {
        setSelectedWorkspace(workspace);
    };

    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <Dropdown position="bottom-right">
            <Dropdown.Toggle>
                <div className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-100">
                    <BriefcaseBusiness className="h-5 w-5" />
                    <span className="hidden sm:block">{selectedWorkspace?.name ?? 'No Workspace Selected'}</span>
                </div>
            </Dropdown.Toggle>

            <Dropdown.Content>
                {workspace && workspace.length > 0 ? (
                    workspace.map((workspaceItem) => (
                        <button
                            key={workspaceItem.id}
                            onClick={() => changeWorkspace(workspaceItem)}
                            className="flex w-full items-center gap-2 border-b p-3 transition-colors last:border-b-0 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                        >
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                                {workspaceItem.image ? (
                                    <img
                                        src={`http://localhost:5000/${workspaceItem.image}`}
                                        alt={workspaceItem.name}
                                        className="h-full w-full rounded-full object-cover"
                                        crossOrigin="anonymous"
                                    />
                                ) : (
                                    workspaceItem.name.charAt(0).toUpperCase()
                                )}
                            </span>
                            <div className="flex flex-col text-left">
                                <p className="font-medium text-gray-900 dark:text-white">{workspaceItem.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Created: {formatDate(workspaceItem.createdAt)}
                                </p>
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="p-3 text-gray-500 dark:text-gray-400">No workspaces available</div>
                )}
            </Dropdown.Content>
        </Dropdown>
    );
};

export default WorkspaceSwitcher;
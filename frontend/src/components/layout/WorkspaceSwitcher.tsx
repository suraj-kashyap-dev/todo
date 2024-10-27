import React, { useEffect, useState } from 'react';
import Dropdown from '../ui/Dropdown';
import { useWorkspaceApi } from '../../hooks/useWorkspaceApi';
import { showToast } from '../../utils/toast';
import { Workspace as WorkspaceType } from '../../types/workspace.types';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WorkspaceSwitcher: React.FC = () => {
    const { workspace, getWorkspace, error } = useWorkspaceApi();
    const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceType | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getWorkspace();
    }, []);

    useEffect(() => {
        const storedWorkspaceId = localStorage.getItem('selectedWorkspaceId');

        if (workspace && workspace.length > 0) {
            if (storedWorkspaceId) {
                const foundWorkspace = workspace.find(ws => ws.id === storedWorkspaceId);

                if (foundWorkspace) {
                    setSelectedWorkspace(foundWorkspace);
                    navigate(`/dashboard/workspaces/${storedWorkspaceId}`);
                }
            } else if (!selectedWorkspace) {
                const firstWorkspaceId = workspace[0].id;

                setSelectedWorkspace(workspace[0]);
                navigate(`/dashboard/workspaces/${firstWorkspaceId}`);
                localStorage.setItem('selectedWorkspaceId', firstWorkspaceId);
            }
        }
    }, [workspace, navigate, selectedWorkspace]);


    useEffect(() => {
        if (error) showToast(error, { type: 'error' });
    }, [error]);

    const changeWorkspace = (workspaceItem: WorkspaceType) => {
        setSelectedWorkspace(workspaceItem);
        navigate(`/dashboard/workspaces/${workspaceItem.id}`);
        localStorage.setItem('selectedWorkspaceId', workspaceItem.id);
    };

    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <Dropdown position="bottom-right">
            <Dropdown.Toggle>
                <div className="flex min-w-[225px] cursor-pointer select-none items-center rounded-lg bg-gray-200 p-3 hover:bg-gray-300">
                    <div className="flex items-center gap-2">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                            {selectedWorkspace?.image ? (
                                <img
                                    src={`http://localhost:5000/${selectedWorkspace.image}`}
                                    alt={selectedWorkspace.name}
                                    className="h-full w-full rounded-full object-cover"
                                    crossOrigin="anonymous"
                                />
                            ) : (
                                (selectedWorkspace?.name ?? "N").charAt(0).toUpperCase()
                            )}
                        </span>

                        <span className="text-sm font-medium text-gray-700">
                            {selectedWorkspace?.name ?? 'No Workspace Selected'}
                        </span>
                    </div>

                    {/* Dropdown icon positioned to the right */}
                    <ChevronsUpDown className="ml-auto h-4 w-4 text-gray-500" />
                </div>
            </Dropdown.Toggle>

            <Dropdown.Content>
                {workspace && workspace.length > 0 ? (
                    workspace.map((workspaceItem) => (
                        <button
                            key={workspaceItem.id}
                            onClick={() => changeWorkspace(workspaceItem)}
                            className="flex w-full select-none items-center gap-2 border-b p-3 transition-colors last:border-b-0 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
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
                            <div className="flex flex-1 flex-col text-left">
                                <p className="font-medium text-gray-900 dark:text-white">{workspaceItem.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Created: {formatDate(workspaceItem.createdAt)}
                                </p>
                            </div>
                            {selectedWorkspace?.id === workspaceItem.id && (
                                <Check className='h-5 w-5 text-green-500' />
                            )}
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

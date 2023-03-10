import { useEffect, useState } from 'react';
import requestAgent from '../../app/api/requestAgent';
import { FormState, FormContentState } from '../../app/layout/Content';
import { User } from '../../app/models/user';
import ContentAppBar from '../shared/ContentAppBar';
import UserForm from './UserForm';
import UserList from './UserList';
import { v4 as uuid } from 'uuid';

interface Props {
    contentState: FormContentState;
    contentFormStateHandler: (state: FormContentState) => void;
    selectedMenuId: number;
}

export default function UserContent({ contentState, contentFormStateHandler, selectedMenuId }: Props) {

    const [editableUser, setEditableUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        requestAgent.Users.list()
            .then((response) => {
                setUsers(response);
            })
    }, []);

    function handleEditableUser(user: User | null) {
        setEditableUser(user);
    }

    function handleCreateOrEditUser(user: User) {
        setSubmitting(true);
        if (user.id) {
            requestAgent.Users.update(user).then(() => {
                setUsers([...users.filter(u => u.id !== user.id), user]);
                setSubmitting(false);
            });
        } else {
            user.id = uuid()
            requestAgent.Users.create(user).then(() => {
                setUsers([...users, user])
                setSubmitting(false);
            })
        }
    }

    function handleDeleteUser(id: string) {
        setSubmitting(true);
        requestAgent.Users.delete(id).then(() => {
            setUsers([...users.filter(user => user.id !== id)])
            setEditableUser(null);
            setSubmitting(false);
        })
    }

    const renderUserContent = () => {
        switch (contentState) {

            case FormContentState.list:
                return (
                    <UserList userDeleteHandler={handleDeleteUser} users={users} setUserToEdit={handleEditableUser} contentFormState={contentFormStateHandler} />
                );

            case FormContentState.new:
                return (
                    <UserForm submitting={submitting} userHandler={handleCreateOrEditUser} editUser={null} formUserState={FormState.create} contentFormState={contentFormStateHandler} />
                );

            case FormContentState.edit:
                return (
                    <UserForm submitting={submitting} userHandler={handleCreateOrEditUser} editUser={editableUser} formUserState={FormState.edit} contentFormState={contentFormStateHandler} />
                );

            default:
                return (<h2>Brak strony</h2>);
        }
    }

    return (
        <>
            <ContentAppBar selectedId={selectedMenuId} userFormStateHandler={contentFormStateHandler} />
            {renderUserContent()}
        </>
    )
}

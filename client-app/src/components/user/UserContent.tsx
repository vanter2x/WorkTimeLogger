import { useState } from 'react';
import { FormState, FormContentState } from '../../app/layout/Content';
import { User } from '../../app/models/user';
import ContentAppBar from '../shared/ContentAppBar';
import UserForm from './UserForm';
import UserList from './UserList';

interface Props {
    contentState: FormContentState;
    contentFormStateHandler: (state: FormContentState) => void;
    selectedMenuId: number;
}

export default function UserContent({ contentState, contentFormStateHandler, selectedMenuId }: Props) {

    const [editableUser, setEditableUser] = useState<User | null>(null);

    const handleEditableUser = (user: User | null) => {
        setEditableUser(user);
    }

    const renderUserContent = () => {
        switch (contentState) {

            case FormContentState.list:
                return (
                    <UserList setUserToEdit={handleEditableUser} contentFormState={contentFormStateHandler} />
                );

            case FormContentState.new:
                return (
                    <UserForm editUser={null} formUserState={FormState.create} contentFormState={contentFormStateHandler} />
                );

            case FormContentState.edit:
                return (
                    <UserForm editUser={editableUser} formUserState={FormState.edit} contentFormState={contentFormStateHandler} />
                );

            default:
                return (<h2>Brak strony</h2>);
        }
    }

    return (
        <>
            <ContentAppBar selectedId={selectedMenuId} userFormStateHandler={contentFormStateHandler} />
            {renderUserContent()};
        </>
    )

}
import { useState } from 'react';
import { FormState, FormContentState } from '../../app/layout/Content';
import { User } from '../../app/models/user';
import UserForm from './UserForm';
import UserList from './UserList';

interface Props {
    contentState: FormContentState;
    contentFormStateHandler: (state: FormContentState) => void;
}

export default function UserContent({ contentState, contentFormStateHandler }: Props) {

    const [editableUser, setEditableUser] = useState<User | null>(null);

    const handleEditableUser = (user: User | null) => {
        setEditableUser(user);
    }


    switch (contentState) {

        case FormContentState.list:
            return (
                <UserList setUserToEdit={handleEditableUser} contentFormState={contentFormStateHandler} />
            )

        case FormContentState.new:
            return (
                <UserForm editUser={null} formUserState={FormState.create} contentFormState={contentFormStateHandler} />
            );

        case FormContentState.edit:
            return (
                <UserForm editUser={editableUser} formUserState={FormState.edit} contentFormState={contentFormStateHandler} />
            );

        default:
            return (<h2>lala</h2>)
    }

}
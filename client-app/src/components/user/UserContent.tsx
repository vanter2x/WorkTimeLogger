import { FormState, FormContentState } from '../../app/layout/Content';
import { User } from '../../app/models/user';
import UserForm from './UserForm';
import UserList from './UserList';

interface Props {
    contentState: FormContentState;
    editableUser: User | null;
    setEditableUser: (user: User | null) => void;
}

export default function UserContent({ contentState, editableUser, setEditableUser }: Props) {

    switch (contentState) {

        case FormContentState.list:
            return (
                <UserList setUserToEdit={setEditableUser} />
            )

        case FormContentState.new:
            return (
                <UserForm editUser={null} formUserState={FormState.create} />
            );

        case FormContentState.edit:
            return (
                <UserForm editUser={editableUser} formUserState={FormState.create} />
            );

        default:
            return (<h2>lala</h2>)
    }

}
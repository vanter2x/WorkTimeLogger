import { FormContentState } from "../../app/layout/Content";
import { User } from "../../app/models/user";
import ClientList from "../client/ClientList";
import UserContent from "../user/UserContent";


interface Props {
    listId: number
    formContateState: FormContentState
    userToEdit: User | null;
    userToEditHandler: (user: User | null) => void;

}

export default function ContentList({ listId, formContateState, userToEdit, userToEditHandler }: Props) {
    switch (listId) {
        case 0:
            return (
                <UserContent contentState={formContateState} editableUser={userToEdit} setEditableUser={userToEditHandler} />
            )
        case 1:
            return (
                <ClientList />
            )
        default:
            return (
                <h2>Brak rekordów</h2>
            )
    }
}
import { User } from "../../app/models/user";
import ClientList from "../client/ClientList";
import UserList from "../user/UserList";


interface Props {
    listId: number
    userHandler: (user: User) => void;
}

export default function ContentList({ listId, userHandler }: Props) {
    switch (listId) {
        case 0:
            return (
                <UserList selectedUser={userHandler} />
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
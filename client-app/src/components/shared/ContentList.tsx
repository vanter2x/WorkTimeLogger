import ClientList from "../client/ClientList";
import UserList from "../user/UserList";


interface Props {
    listId: Number
}

export default function ContentList({ listId }: Props) {
    switch (listId) {
        case 0:
            return (
                <UserList />
            )
        case 1:
            return (
                <ClientList />
            )
        default:
            return (
                <p>Brak rekordów</p>
            )
    }
}
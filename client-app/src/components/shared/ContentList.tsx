import ClientList from "../client/ClientList";
import UserList from "../user/UserList";


interface Props {
    listId: number
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
                <h2>Brak rekordów</h2>
            )
    }
}
import ClientList from "../client/ClientList";
import AddUserForm from "../user/AddUserForm";
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
                <AddUserForm />
            )
    }
}
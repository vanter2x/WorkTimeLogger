import Paper from '@mui/material/Paper';
import ContentList from '../../components/shared/ContentList';
import ContentAppBar from '../../components/shared/ContentAppBar';
import { User } from '../models/user';
import { useState } from 'react';
import AddUserForm from '../../components/user/AddUserForm';

interface Props {
  selectedMenuId: number;
}

export default function Content({ selectedMenuId }: Props) {

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState(false);

  const handleUserSetter = (user: User) => {
    setSelectedUser(user);
  }

  const handleNewUser = (isNewUser: boolean) => {
    setNewUser(isNewUser);
  }

  return (
    <Paper sx={{ maxWidth: 1002, margin: 'auto', overflow: 'auto' }}>
      <ContentAppBar selectedId={selectedMenuId} userSelect={selectedUser} newUserHandler={handleNewUser} />
      {newUser ? <AddUserForm />
        :
        <ContentList listId={selectedMenuId} userHandler={handleUserSetter} />
      }
    </Paper>
  );
}

import Paper from '@mui/material/Paper';
import ContentList from '../../components/shared/ContentList';
import ContentAppBar from '../../components/shared/ContentAppBar';
import { useState } from 'react';
import AddUserForm from '../../components/user/AddUserForm';

interface Props {
  selectedMenuId: number;
}

export enum FormState {
  'none' = 0,
  'create' = 1,
  'edit',
  'delete'
}

export default function Content({ selectedMenuId }: Props) {
  const [newUser, setNewUser] = useState(false);
  const [userFormState, setUserFormState] = useState<FormState>(FormState.none)

  const handleNewUser = (isNewUser: boolean) => {
    setNewUser(isNewUser);
  }

  const handleUserFormState = (state: FormState) => {
    setUserFormState(state);
  }
  //rozwiązać sprawę edycji i nowego użytkownika
  return (
    <Paper sx={{ maxWidth: 1002, margin: 'auto', overflow: 'auto' }}>
      <ContentAppBar selectedId={selectedMenuId} newUserHandler={handleNewUser} userFormStateHandler={handleUserFormState} />
      {newUser ? <AddUserForm isNewUser={handleNewUser} editUser={null} formUserState={userFormState} />
        : <ContentList listId={selectedMenuId} />}
    </Paper>
  );
}

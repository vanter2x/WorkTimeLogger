import Paper from '@mui/material/Paper';
import ContentList from '../../components/shared/ContentList';
import ContentAppBar from '../../components/shared/ContentAppBar';
import { useState } from 'react';
import { User } from '../models/user';

interface Props {
  selectedMenuId: number;
}

export const enum FormContentState {
  list = 0,
  new,
  edit
}

export const enum FormState {
  create = 1,
  edit
}

export default function Content({ selectedMenuId }: Props) {

  const [formState, setFormState] = useState<FormContentState>(FormContentState.list)
  const [editableUser, setEditableUser] = useState<User | null>(null);

  const handleContentState = (state: FormContentState) => {
    setFormState(state);
  }

  const handleEditableUser = (user: User | null) => {
    setEditableUser(user);
  }

  //rozwiązać sprawę edycji i nowego użytkownika
  return (
    <Paper sx={{ maxWidth: 1002, margin: 'auto', overflow: 'auto' }}>
      <ContentAppBar selectedId={selectedMenuId} userFormStateHandler={handleContentState} />
      <ContentList formContateState={formState} userToEdit={editableUser} listId={selectedMenuId} userToEditHandler={handleEditableUser} />
    </Paper>
  );
}

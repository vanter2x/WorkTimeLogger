import Paper from '@mui/material/Paper';
import ContentList from '../../components/shared/ContentList';

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

  return (
    <Paper sx={{ maxWidth: 1002, margin: 'auto', overflow: 'auto' }}>
      <ContentList listId={selectedMenuId} />
    </Paper>
  )
}

import Paper from '@mui/material/Paper';
import ContentList from '../../components/shared/ContentList';
import ContentAppBar from '../../components/shared/ContentAppBar';

interface Props {
  selectedMenuId: number;
}

export default function Content({ selectedMenuId }: Props) {
  return (
    <Paper sx={{ maxWidth: 1002, margin: 'auto', overflow: 'auto' }}>
      <ContentAppBar selectedId={selectedMenuId} />
      <ContentList listId={selectedMenuId} />
    </Paper>
  );
}

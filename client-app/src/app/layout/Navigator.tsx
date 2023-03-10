import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import RecentActors from '@mui/icons-material/RecentActors';
import { HomeRepairService, WorkHistory } from '@mui/icons-material';

const categories = [
  {
    id: 'Menu',
    children: [
      {
        id: 0,
        text: 'Użytkownicy',
        icon: <PeopleIcon />,
      },
      { id: 1, text: 'Klienci', icon: <RecentActors /> },
      { id: 2, text: 'Miejsca', icon: <PublicIcon /> },
      { id: 3, text: 'Prace', icon: <HomeRepairService /> },
      { id: 4, text: 'Dzień pracy', icon: <WorkHistory /> }
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};



interface Props {
  items: string;
  itemClick: (nr: number) => void;
}

export default function Navigator(props: DrawerProps & Props) {
  const { itemClick, items, ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          Dziennik Pracy
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, text, icon }) => (
              <ListItem disablePadding key={childId} onClick={() => props.itemClick(childId)}>
                <ListItemButton selected={props.items === childId.toString() ? true : false} sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{text}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}

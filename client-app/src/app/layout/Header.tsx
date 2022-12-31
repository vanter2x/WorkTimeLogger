import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const lightColor = 'rgba(255, 255, 255, 0.7)';

interface HeaderProps {
  onDrawerToggle: () => void;
  tabIndex: Number;
  onTabClick: (nr: Number) => void;
}

export default function Header({ onDrawerToggle, tabIndex, onTabClick }: HeaderProps) {
  const activeId = "Użytkownicy";

  return (
    <React.Fragment>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {activeId}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                sx={{ borderColor: lightColor }}
                variant="outlined"
                color="inherit"
                size="small"
              >
                Wyloguj
              </Button>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Tabs value={tabIndex} textColor="inherit">
          <Tab label="Użytkownicy" onClick={() => onTabClick(0)} />
          <Tab label="Klienci" onClick={() => onTabClick(1)} />
          <Tab label="Miejsca" onClick={() => onTabClick(2)} />
          <Tab label="Prace" onClick={() => onTabClick(3)} />
          <Tab label="Dzień pracy" onClick={() => onTabClick(4)} />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

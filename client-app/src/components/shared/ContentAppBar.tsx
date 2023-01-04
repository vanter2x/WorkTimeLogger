import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function ContentAppBar() {
    return (
        <AppBar
            position="static"
            color="primary"
            elevation={0}
            sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
            <Toolbar>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                    </Grid>
                    <Grid item>
                        <Button id="user" variant="contained" color='secondary' sx={{ mr: 1 }}>
                            Dodaj użytkownika
                        </Button>
                        <Button id="user" variant="contained" color='secondary' sx={{ mr: 1 }}>
                            Edytuj użytkownika
                        </Button>
                        <Button id="user" variant="contained" color='secondary' sx={{ mr: 1 }}>
                            Usuń użytkownika
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>

    )
}
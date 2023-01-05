import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { User } from '../../app/models/user';

interface Props {
    selectedId: number
    userSelect: User | null;
    newUserHandler: (isNewUser: boolean) => void;
}



export default function ContentAppBar({ selectedId, userSelect, newUserHandler }: Props) {
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
                        <Button onClick={() => newUserHandler(true)} id="adduser" variant="contained" color='secondary' sx={{ mr: 1 }}>
                            Dodaj {selectedId === 0 ? 'uzytkownika' : 'clienta'}
                        </Button>
                        <Button id="edituser" variant="contained" color='secondary' sx={{ mr: 1 }}>
                            Edytuj {selectedId === 0 ? 'uzytkownika' : 'clienta'}
                        </Button>
                        <Button id="deleteuser" variant="contained" color='secondary' sx={{ mr: 1 }}>
                            Usuń {selectedId === 0 ? 'uzytkownika' : 'clienta'}
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { User } from '../../app/models/user';
import { FormState } from '../../app/layout/Content';

const lightColor = 'rgba(255, 255, 255, 0.7)';

interface Props {
    selectedId: number
    userSelect: User | null;
    newUserHandler: (isNewUser: boolean) => void;
    userFormStateHandler: (formState: FormState) => void;
}



export default function ContentAppBar({ selectedId, userSelect, newUserHandler, userFormStateHandler }: Props) {

    const formStateChange = (newUser: boolean, formState: FormState) => {
        newUserHandler(newUser);
        userFormStateHandler(formState);
    }

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
                    <Grid item >

                        <Button
                            onClick={() => formStateChange(true, FormState.create)}
                            id="adduser"
                            sx={{ borderColor: lightColor }}
                            variant="outlined"
                            color="inherit"
                            size="small"
                        >
                            Dodaj {selectedId === 0 ? 'uzytkownika' : 'clienta'}
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
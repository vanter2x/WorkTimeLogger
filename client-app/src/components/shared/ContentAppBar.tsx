import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { FormContentState } from '../../app/layout/Content';

const lightColor = 'rgba(255, 255, 255, 0.7)';

interface Props {
    selectedId: number;
    userFormStateHandler: (formState: FormContentState) => void;
}

export default function ContentAppBar({ selectedId, userFormStateHandler }: Props) {

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
                            onClick={() => userFormStateHandler(FormContentState.new)}
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
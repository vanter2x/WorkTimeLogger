import { Button, Card, CardContent, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { FormState } from '../../app/layout/Content';
import { User } from '../../app/models/user';

interface Props {
    isNewUser: (formShow: boolean) => void;
    editUser: User | null;
    formUserState: FormState;
}

export default function AddUserForm({ isNewUser, editUser, formUserState }: Props) {
    const roles = [
        { id: 1, text: "Admin" },
        { id: 2, text: "Kierownik" },
        { id: 3, text: "Pracownik" }
    ]

    return (
        <Grid>
            <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {editUser === null ? 'Nowy użytkownik' : 'Edytuj użytkownika'}
                    </Typography>
                    <form>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <TextField placeholder="Wpisz imię" label="Imię" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField placeholder="Wpisz nazwisko" label="Nazwisko" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField type="email" placeholder="Wpisz adres e-mail" label="Email" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField placeholder="Wpisz numer telefonu" label="Telefon" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="select-role"
                                    select
                                    required
                                    fullWidth
                                    label="Typ konta"
                                    defaultValue="Pracownik"
                                >
                                    {roles.map((option) => (
                                        <MenuItem key={option.id} value={option.text}>
                                            {option.text}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Hasło" type={'password'} placeholder="Podaj hasło" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Powtórz hasło" type={'password'} placeholder="Podaj hasło" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={() => isNewUser(false)} type="submit" variant="contained" color="primary" fullWidth>Zapisz</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={() => isNewUser(false)} variant="outlined" color="primary" >Anuluj</Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Grid>
    )
}
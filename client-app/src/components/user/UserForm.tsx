import { Button, Card, CardContent, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import { FormContentState, FormState } from '../../app/layout/Content';
import { User } from '../../app/models/user';

interface Props {
    editUser: User | null;
    formUserState: FormState;
    contentFormState: (state: FormContentState) => void;
}

export default function UserForm({ editUser, formUserState, contentFormState }: Props) {
    const roles = [
        { id: 1, text: "Admin" },
        { id: 2, text: "Kierownik" },
        { id: 3, text: "Pracownik" }
    ]

    const initialState = editUser ?? {
        id: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        roleId: 3

    };
    const [user, setUser] = useState(initialState)

    return (
        <Grid>
            <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {formUserState === FormState.create ? 'Nowy użytkownik' : 'Edytuj użytkownika'}
                    </Typography>
                    <form>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <TextField placeholder="Wpisz imię" label="Imię" variant="outlined" fullWidth required
                                    value={formUserState === FormState.edit ? editUser?.firstName : ''} />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField placeholder="Wpisz nazwisko" label="Nazwisko" variant="outlined" fullWidth required
                                    value={formUserState === FormState.edit ? editUser?.lastName : ''} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField type="email" placeholder="Wpisz adres e-mail" label="Email" variant="outlined" fullWidth required
                                    value={formUserState === FormState.edit ? editUser?.email : ''} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField placeholder="Wpisz numer telefonu" label="Telefon" variant="outlined" fullWidth required
                                    value={formUserState === FormState.edit ? editUser?.phone : ''} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="select-role"
                                    select
                                    required
                                    fullWidth
                                    label="Typ konta"
                                    defaultValue={formUserState === FormState.edit ? roles.filter(role => role.id === editUser?.roleId)[0].text : 'Pracownik'}
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
                                <Button type="submit" variant="contained" color="primary" fullWidth>Zapisz</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={() => contentFormState(FormContentState.list)} variant="outlined" color="primary" >Anuluj</Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Grid>
    )
}
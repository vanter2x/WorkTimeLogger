import { LoadingButton } from '@mui/lab';
import { Button, Card, CardContent, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react';
import { FormContentState, FormState } from '../../app/layout/Content';
import { User } from '../../app/models/user';

interface Props {
    editUser: User | null;
    formUserState: FormState;
    contentFormState: (state: FormContentState) => void;
    userHandler: (user: User) => void;
    submitting: boolean;
}

export default function UserForm({ editUser, formUserState, contentFormState, userHandler, submitting }: Props) {
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

    function handleSubmit() {
        userHandler(user);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        if (name === 'roleId') {
            const id = roles.findIndex(x => x.text === value);
            setUser({ ...user, [name]: id + 1 })
        } else {
            setUser({ ...user, [name]: value })
        }
    }

    return (
        <Grid>
            <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {formUserState === FormState.create ? 'Nowy użytkownik' : 'Edytuj użytkownika'}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <TextField onChange={handleInputChange} name='firstName' placeholder="Wpisz imię" label="Imię" variant="outlined" fullWidth required
                                    value={user.firstName} />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField onChange={handleInputChange} name='lastName' placeholder="Wpisz nazwisko" label="Nazwisko" variant="outlined" fullWidth required
                                    value={user.lastName} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleInputChange} name='email' type="email" placeholder="Wpisz adres e-mail" label="Email" variant="outlined" fullWidth required
                                    value={user.email} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleInputChange} name='phone' placeholder="Wpisz numer telefonu" label="Telefon" variant="outlined" fullWidth required
                                    value={user.phone} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="select-role"
                                    onChange={handleInputChange}
                                    name='roleId'
                                    select
                                    required
                                    fullWidth
                                    label="Typ konta"
                                    defaultValue={roles.filter(role => role.id === user.roleId)[0].text}
                                >
                                    {roles.map((option) => (
                                        <MenuItem key={option.id} value={option.text}>
                                            {option.text}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Hasło" type={'password'} placeholder="Podaj hasło" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Powtórz hasło" type={'password'} placeholder="Podaj hasło" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton loading={submitting} type="submit" variant="contained" color="primary" fullWidth>Zapisz</LoadingButton>
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
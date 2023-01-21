import { LoadingButton } from '@mui/lab';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react';
import { FormContentState, FormState } from '../../app/layout/Content';
import { Client } from '../../app/models/client';

interface Props {
    editClient: Client | null;
    formUserState: FormState;
    contentFormState: (state: FormContentState) => void;
    clientHandler: (user: Client) => void;
    submitting: boolean;
}

export default function ClientForm({ editClient, formUserState, contentFormState, clientHandler, submitting }: Props) {

    const initialState = editClient ?? {
        id: 0,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
    };

    const [client, setClient] = useState(initialState);

    function handleSubmit() {
        clientHandler(client);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setClient({ ...client, [name]: value })
    }


    return (
        <Grid>
            <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {formUserState === FormState.create ? 'Nowy klient' : 'Edytuj klienta'}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <TextField onChange={handleInputChange} name='firstName' placeholder="Wpisz imię" label="Imię" variant="outlined" fullWidth required
                                    value={client.firstName} />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField onChange={handleInputChange} name='lastName' placeholder="Wpisz nazwisko" label="Nazwisko" variant="outlined" fullWidth required
                                    value={client.lastName} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleInputChange} name='email' type="email" placeholder="Wpisz adres e-mail" label="Email" variant="outlined" fullWidth required
                                    value={client.email} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleInputChange} placeholder="Wpisz numer telefonu" label="Telefon" variant="outlined" fullWidth required
                                    value={client.phone} />
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
import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import { FormContentState, FormState } from '../../app/layout/Content';
import { Client } from '../../app/models/client';

interface Props {
    editClient: Client | null;
    formUserState: FormState;
    contentFormState: (state: FormContentState) => void;
}

export default function ClientForm({ editClient, formUserState, contentFormState }: Props) {

    return (
        <Grid>
            <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {formUserState === FormState.create ? 'Nowy klient' : 'Edytuj klienta'}
                    </Typography>
                    <form>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <TextField placeholder="Wpisz imię" label="Imię" variant="outlined" fullWidth required
                                    value={formUserState === FormState.edit ? editClient?.firstName : ''} />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField placeholder="Wpisz nazwisko" label="Nazwisko" variant="outlined" fullWidth required
                                    value={formUserState === FormState.edit ? editClient?.lastName : ''} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField type="email" placeholder="Wpisz adres e-mail" label="Email" variant="outlined" fullWidth required
                                    value={formUserState === FormState.edit ? editClient?.email : ''} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField placeholder="Wpisz numer telefonu" label="Telefon" variant="outlined" fullWidth required
                                    value={formUserState === FormState.edit ? editClient?.phone : ''} />
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
import { Button, ButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams, GridRowsProp } from "@mui/x-data-grid";
import { MouseEventHandler, useEffect, useState } from "react";
import requestAgent from "../../app/api/requestAgent";
import { FormContentState } from "../../app/layout/Content";
import { Client } from "../../app/models/client";
import LoadingComponent from "../shared/LoadingConponent";

const columns: GridColDef[] = [
    {
        field: "firstName",
        headerName: "Imię",
        width: 150,
        editable: false,
    },
    {
        field: "lastName",
        headerName: "Nazwisko",
        width: 150,
        editable: false,
    },
    {
        field: "phoneNumber",
        headerName: "Telefon",
        width: 110,
        editable: false,
    },
    {
        field: "email",
        headerName: "Email",
        sortable: false,
        width: 250,
        editable: false,
    },
];

let column: any = (editCall: MouseEventHandler<HTMLButtonElement>, deleteCall: MouseEventHandler<HTMLButtonElement>) => {
    return ({
        field: "action",
        headerName: "Edytuj/Usuń",
        width: 180,
        headerAlign: 'center',
        sortable: false,
        align: 'center',
        renderCell: () =>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={editCall} id='edit'>Edytuj</Button>
                <Button onClick={deleteCall} id='delete'>Usuń</Button>
            </ButtonGroup>
    })
}

const createRandomRow = (client: any) => {
    return {
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        phoneNumber: client.phone,
        email: client.email,
    };
};

interface Props {
    setClientToEdit: (user: Client | null) => void;
    contentFormState: (state: FormContentState) => void;
}

export default function ClientList({ setClientToEdit, contentFormState }: Props) {
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        requestAgent.Clients.list()
            .then((response) => {
                setClients(response);
                setLoading(false);
            })
    }, []);

    useEffect(() => {
        setRows([]);
        clients.map((client) => setRows((rows) => [...rows, createRandomRow(client)]));
    }, [clients])

    let buttonsColumn = column(() => { contentFormState(FormContentState.edit) },
        () => console.log('d'));

    if (loading) {
        return (
            <Box sx={{ height: 400, width: "100%" }}>
                <LoadingComponent />
            </Box>
        )
    }

    return (
        <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={[...columns, buttonsColumn]}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
                onRowClick={(row) => {
                    const selectedId = row.id;
                    let clientSelect: Client | null | undefined = clients.find((client) => client.id === selectedId)
                    if (clientSelect === undefined) clientSelect = null;
                    setClientToEdit(clientSelect);
                }}
            />
        </Box>
    );
}

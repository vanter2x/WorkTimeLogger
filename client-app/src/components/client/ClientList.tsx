import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import requestAgent from "../../app/api/requestAgent";
import { Client } from "../../app/models/client";

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
        width: 160,
        editable: false,
    },
];

const createRandomRow = (client: any) => {
    return {
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        phoneNumber: client.phone,
        email: client.email,
    };
};

export default function ClientList() {
    const [clients, setClients] = useState<Client[]>([]);
    const [rows, setRows] = useState<GridRowsProp>([]);

    useEffect(() => {
        requestAgent.Clients.list()
            .then((response) => {
                setClients(response);
            }).catch((error) => { console.log(error); });
    }, []);

    useEffect(() => {
        setRows([]);
        clients.map((client) => setRows((rows) => [...rows, createRandomRow(client)]));
    }, [clients])

    return (
        <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    );
}

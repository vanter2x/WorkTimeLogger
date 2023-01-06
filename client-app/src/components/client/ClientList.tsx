import { Button, ButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import requestAgent from "../../app/api/requestAgent";
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
    {
        field: "action",
        headerName: "Edytuj/Usuń",
        width: 180,
        sortable: false,
        renderCell: ({ row }: Partial<GridRowParams>) =>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button>Edytuj</Button>
                <Button>Usuń</Button>
            </ButtonGroup>
    }
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
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState<any>(null);

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
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
                onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selectedRow = rows.filter((row) =>
                        selectedIDs.has(row.id),
                    );
                    setSelectedRows(selectedRow);
                    console.log(selectedRows);
                }}
            />
        </Box>
    );
}

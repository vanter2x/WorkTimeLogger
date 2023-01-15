import Box from "@mui/material/Box";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import requestAgent from "../../app/api/requestAgent";
import { FormContentState } from "../../app/layout/Content";
import { Client } from "../../app/models/client";
import { createRandomRow, getColumns, makeButtonColumn } from "../shared/columnSettings";
import LoadingComponent from "../shared/LoadingConponent";


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

    var columns = getColumns();

    let buttonsColumn = makeButtonColumn(() => { contentFormState(FormContentState.edit) },
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

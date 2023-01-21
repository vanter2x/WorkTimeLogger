import Box from "@mui/material/Box";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { FormContentState } from "../../app/layout/Content";
import { Client } from "../../app/models/client";
import { createRandomRow, getColumns, makeButtonColumn } from "../shared/columnSettings";


interface Props {
    setClientToEdit: (user: Client | null) => void;
    contentFormState: (state: FormContentState) => void;
    clientDeleteHandler: (id: number) => void;
    clients: Client[];
}

export default function ClientList({ setClientToEdit, contentFormState, clientDeleteHandler, clients }: Props) {
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [client, setClient] = useState<Client | null>();

    useEffect(() => {
        setRows([]);
        clients.map((client) => setRows((rows) => [...rows, createRandomRow(client)]));
    }, [clients])

    var columns = getColumns();

    let buttonsColumn = makeButtonColumn(() => { contentFormState(FormContentState.edit) },
        () => clientDeleteHandler(client?.id as number));

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
                    let clientSelect: Client | null = clients.filter((client) => client.id === selectedId)[0];
                    if (clientSelect === undefined) clientSelect = null;
                    setClientToEdit(clientSelect);
                    setClient(clientSelect)
                    buttonsColumn = makeButtonColumn(() => { contentFormState(FormContentState.edit) },
                        () => clientDeleteHandler(client?.id as number));
                }}
            />
        </Box>
    );
}

import Box from "@mui/material/Box";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { FormContentState } from "../../app/layout/Content";
import { User } from "../../app/models/user";
import { createRandomRow, getColumns, makeButtonColumn } from "../shared/columnSettings";

interface Props {
  setUserToEdit: (user: User | null) => void;
  contentFormState: (state: FormContentState) => void;
  users: User[];
}

export default function UserList({ users, setUserToEdit, contentFormState }: Props) {

  const [rows, setRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    setRows([]);
    users.map((user) => setRows((rows) => [...rows, createRandomRow(user)]));
  }, [users])

  var columns = getColumns();

  let buttonsColumn = makeButtonColumn(() => { contentFormState(FormContentState.edit) },
    () => console.log('d'));
    
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={[...columns, buttonsColumn]}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableVirtualization
        experimentalFeatures={{ newEditingApi: true }}
        onRowClick={(row) => {
          const selectedId = row.id;
          let userSelect: User | null | undefined = users.find((user) => user.id === selectedId)
          if (userSelect === undefined) userSelect = null;
          setUserToEdit(userSelect);
        }}
      />
    </Box>
  );
}
import Box from "@mui/material/Box";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import requestAgent from "../../app/api/requestAgent";
import { FormContentState } from "../../app/layout/Content";
import { User } from "../../app/models/user";
import { createRandomRow, getColumns, makeButtonColumn } from "../shared/columnSettings";
import LoadingComponent from "../shared/LoadingConponent";

interface Props {
  setUserToEdit: (user: User | null) => void;
  contentFormState: (state: FormContentState) => void;
}

export default function UserList({ setUserToEdit, contentFormState }: Props) {

  const [rows, setRows] = useState<GridRowsProp>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestAgent.Users.list()
      .then((response) => {
        setUsers(response);
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    setRows([]);
    users.map((user) => setRows((rows) => [...rows, createRandomRow(user)]));
  }, [users])

  var columns = getColumns();

  let buttonsColumn = makeButtonColumn(() => { contentFormState(FormContentState.edit) },
    () => console.log('d'));

  if (loading) return <LoadingComponent />
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
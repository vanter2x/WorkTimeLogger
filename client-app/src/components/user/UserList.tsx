import { Button, ButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import requestAgent from "../../app/api/requestAgent";
import { User } from "../../app/models/user";
import LoadingComponent from "../shared/LoadingConponent";

const columns: GridColDef[] = [
  {
    field: "firstName",
    headerName: "Imię",
    align: 'center',
    headerAlign: 'center',
    width: 150,
    editable: false,
  },
  {
    field: "lastName",
    headerName: "Nazwisko",
    align: 'center',
    headerAlign: 'center',
    width: 150,
    editable: false,
  },
  {
    field: "phoneNumber",
    headerName: "Telefon",
    align: 'center',
    headerAlign: 'center',
    width: 110,
    editable: false,
  },
  {
    field: "email",
    headerName: "Email",
    sortable: false,
    headerAlign: 'center',
    width: 250,
    align: 'center',
    editable: false,
  },
  {
    field: "action",
    headerName: "Edytuj/Usuń",
    width: 180,
    headerAlign: 'center',
    sortable: false,
    align: 'center',
    renderCell: () =>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button id='edit'>Edytuj{selectedUser?.firstName}</Button>
        <Button id='delete'>Usuń</Button>
      </ButtonGroup>
  }
];

// const buttonColumn = (ss:any) => {
//   return({
//     field: "action",
//     headerName: "Edytuj/Usuń",
//     width: 180,
//     headerAlign: 'center',
//     sortable: false,
//     align: 'center',
//     renderCell: () =>
//       <ButtonGroup variant="contained" aria-label="outlined primary button group">
//         <Button id='edit' onClick={ss}>Edytuj{selectedUser?.firstName}</Button>
//         <Button id='delete'>Usuń</Button>
//       </ButtonGroup>
//   })
// }

let selectedUser: User | null = null;

const setUser = (user: User | null) => {
  selectedUser = user;
}

const createRandomRow = (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phone,
    email: user.email,
  };
};

interface Props {
  setUserToEdit: (user: User | null) => void;
}

export default function UserList({ setUserToEdit }: Props) {

  let [rows, setRows] = useState<GridRowsProp>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [euser, setEuser] = useState<User | null>(null);

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

  if (loading) return <LoadingComponent />

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableVirtualization
        experimentalFeatures={{ newEditingApi: true }}
        onRowClick={(row) => {
          const selectedId = row.id;
          let userSelect: User | null | undefined = users.find((user) => user.id === selectedId)
          if (userSelect === undefined) userSelect = null;
          setUser(userSelect);
          setEuser(userSelect);
          setUserToEdit(userSelect);
        }}
        onRowDoubleClick={() => {
          setUserToEdit(euser);
        }}
      />
    </Box>
  );
}
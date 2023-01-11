import { Button, ButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import requestAgent from "../../app/api/requestAgent";
import { User } from "../../app/models/user";
import LoadingComponent from "../shared/LoadingConponent";
import AddUserForm from "./AddUserForm";

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
        <Button>Edytuj{selectedUser?.firstName}</Button>
        <Button>Usuń</Button>
      </ButtonGroup>
  }
];

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

export default function UserList() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null)


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
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const userSelect = users.filter((user) =>
            selectedIDs.has(user.id)
          );
          setSelectedUser(userSelect[0]);
          setUser(selectedUser);
          console.log(userSelect[0]); //do usunięcia!!!!!!!!!!!!!!!!!!!!!!!!
        }}
      />
    </Box>
  );
}
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

const createRandomRow = (user: any) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phone,
    email: user.email,
  };
};

interface Props {
  selectedUser: (user: User) => void;
}

export default function UserList({ selectedUser }: Props) {
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

  if (loading) return <LoadingComponent />

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
          const userSelect = users.filter((user) =>
            selectedIDs.has(user.id)
          );

          selectedUser(userSelect[0]);
          console.log(userSelect[0]); //do usunięcia!!!!!!!!!!!!!!!!!!!!!!!!
        }}
      />
    </Box>
  );
}
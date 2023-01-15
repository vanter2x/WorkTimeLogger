import { Button, ButtonGroup } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { MouseEventHandler } from "react";
import { User } from "../../app/models/user";

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
  }
];

export const getColumns = () => columns;

export const makeButtonColumn: any = (editCall: MouseEventHandler<HTMLButtonElement>, deleteCall: MouseEventHandler<HTMLButtonElement>) => {
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

export const createRandomRow = (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phone,
    email: user.email,
  };
};
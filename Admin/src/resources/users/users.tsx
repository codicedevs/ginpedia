import {
  List,
  Datagrid,
  TextField,
  EmailField,
  Create,
  SimpleForm,
  TextInput,
  EditButton,
  DeleteButton,
} from "react-admin";

import Box from "@mui/material/Box";

export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="roles" />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <EditButton label={""} style={{ padding: 0 }} />
        <DeleteButton label={""} />
      </Box>
    </Datagrid>
  </List>
);

export const UserCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="password" type="password" />
    </SimpleForm>
  </Create>
);

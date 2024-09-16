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
  SelectInput,
  Edit,
  ArrayField,
  SingleFieldList,
  ChipField,
  SelectArrayInput,
} from "react-admin";
import Box from "@mui/material/Box";
import { boxStyle } from "../../styles/common";

const rolesChoices = [
  { id: "user", name: "Usuario" },
  { id: "admin", name: "Administrador" },
];

export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="roles" />
      <Box sx={boxStyle}>
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
      <SelectArrayInput source="roles" choices={rolesChoices} />
    </SimpleForm>
  </Create>
);
export const UserEdit = () => (
  <Edit redirect="list">
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="password" type="password" />
      <SelectArrayInput source="roles" choices={rolesChoices} />
    </SimpleForm>
  </Edit>
);

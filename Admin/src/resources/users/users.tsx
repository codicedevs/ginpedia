import {
  List,
  Datagrid,
  TextField,
  EmailField,
  Create,
  SimpleForm,
  ReferenceInput,
  TextInput,
} from "react-admin";

export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="roles" />
    </Datagrid>
  </List>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="password" type="password" />
    </SimpleForm>
  </Create>
);

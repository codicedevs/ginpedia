import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import {
  ArrayField,
  AutocompleteArrayInput,
  AutocompleteInput,
  ChipField,
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  List,
  ReferenceArrayField,
  ReferenceArrayInput,
  ReferenceField,
  ReferenceManyField,
  SelectArrayInput,
  SelectField,
  SelectInput,
  SimpleForm,
  SingleFieldList,
  TextField,
  TextInput,
  useResourceContext,
} from "react-admin";

export const boxStyle = { display: "flex", justifyContent: "flex-end", gap: 1 };

const productTypeChoices = [
  { id: "gin", name: "Gin" },
  { id: "tonica", name: "Tónica" },
  { id: "especia", name: "Especia" },
];

export const ProductList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="type" />
      <TextField source="image" />
      <TextField source="origin" />
      <TextField source="graduation" />
      <TextField source="rating" />
      <Box sx={boxStyle}>
        <EditButton label={""} style={{ padding: 0 }} />
        <DeleteButton label={""} />
      </Box>
    </Datagrid>
  </List>
);

export const ProductCreate = (props: PropsWithChildren) => (
  <Create {...props} title="Create Product" redirect="list">
    <SimpleForm>
      <TextInput source="name" label="Nombre" />
      <TextInput source="description" />
      <SelectInput source="type" choices={productTypeChoices} />
      <TextInput source="image" />
      <TextInput source="origin" />
      <TextInput source="graduation" />
      <ReferenceArrayInput source="combinations" reference="products">
        <AutocompleteArrayInput
          filterToQuery={(text) => ({ name: { like: text } })}
        />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);

export const ProductEdit = (props: any) => {
  return (
    <Edit {...props} title="Edit Product" redirect="list">
      <SimpleForm>
        <TextField source="id" label="ID" />
        <TextInput source="name" label="Nombre" />
        <TextInput source="description" />
        <SelectInput source="type" choices={productTypeChoices} />
        <TextInput source="image" />
        <TextInput source="origin" />
        <TextInput source="graduation" />
        <ReferenceArrayInput source="combinations" reference="products">
          <AutocompleteArrayInput
            filterToQuery={(text) => ({ name: { like: text } })}
          />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
};
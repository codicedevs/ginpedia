import { PropsWithChildren } from "react";
import {
  ArrayField,
  AutocompleteArrayInput,
  AutocompleteInput,
  ChipField,
  Create,
  Datagrid,
  Edit,
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
      <SelectField source="type" />
      <TextField source="image" />
      <TextField source="origin" />
      <TextField source="graduation" />
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
    <Edit {...props} title="Edit Product">
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

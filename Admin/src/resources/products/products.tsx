import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import {
  AutocompleteArrayInput,
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  ImageField,
  ImageInput,
  Labeled,
  List,
  ReferenceArrayInput,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";

const ImageCustom = ({ source }) => {
  const record = useRecordContext();
  return (
    <img
      src={record[source]}
      style={{
        width: "200px",
        height: "200px",
        objectFit: "cover",
        margin: "auto",
        border: "3px solid black",
      }}
    />
  );
};
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
      <ImageField source="image" />
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
      <ImageInput source="image" label="Imagenes"></ImageInput>
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
        <Labeled title="ID">
          <TextField source="id" label="ID" title="ID" />
        </Labeled>
        <ImageCustom source="image" />
        <TextInput source="name" label="Nombre" />
        <TextInput source="description" />
        <SelectInput source="type" choices={productTypeChoices} />
        <ImageInput
          source="image"
          accept={{ "image/*": [".png", ".jpg"] }}
          label="Cambiar imagen"
        >
          <ImageField source="src" title="title" />
        </ImageInput>

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

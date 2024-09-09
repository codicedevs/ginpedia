import {
  ArrayField,
  ChipField,
  Datagrid,
  List,
  ReferenceField,
  ReferenceManyField,
  SingleFieldList,
  TextField,
  useRecordContext,
} from "react-admin";

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
      <ArrayField source="combinations">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
    </Datagrid>
  </List>
);

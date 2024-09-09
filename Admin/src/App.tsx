import {
  Admin,
  Resource,
  ListGuesser,
  ShowGuesser,
  EditGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { UserCreate, UserList } from "./resources/users/users";
import { ProductList } from "./resources/products/products";

export const App = () => (
  <Admin
    layout={Layout}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Resource
      name="users"
      list={UserList}
      show={ShowGuesser}
      edit={EditGuesser}
      create={UserCreate}
    />
    <Resource
      name="products"
      list={ProductList}
      show={ShowGuesser}
      edit={EditGuesser}
    />
  </Admin>
);

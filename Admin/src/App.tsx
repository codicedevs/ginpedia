import { Admin, Resource, ListGuesser } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";

export const App = () => (
  <Admin
    layout={Layout}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Resource name="users" list={ListGuesser} />
    <Resource name="products" list={ListGuesser} />
  </Admin>
);

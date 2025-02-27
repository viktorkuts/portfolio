import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./app.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router";
import Router from "./routing/router";
import { Navbar } from "./components/navbar/navbar";
import { Auth0Provider } from "@auth0/auth0-react";
import { DataProvider } from "./utils/dataprovider";
import { UserProvider } from "./utils/userprovider";

function App() {
  return (
    <>
      <MantineProvider>
        <Auth0Provider
          domain={String(import.meta.env.VITE_OKTA_ISSUER)
            .replace("//", "")
            .replace("https:", "")
            .replace("/", "")}
          clientId={import.meta.env.VITE_OKTA_CLIENT_ID}
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: import.meta.env.VITE_OKTA_AUDIENCE,
          }}
          cacheLocation="localstorage"
        >
          <BrowserRouter>
            <DataProvider>
              <UserProvider>
                <Navbar />
                <Router />
              </UserProvider>
            </DataProvider>
          </BrowserRouter>
        </Auth0Provider>
      </MantineProvider>
    </>
  );
}

export default App;

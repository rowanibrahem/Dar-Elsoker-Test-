import { KeycloakConfig } from 'keycloak-angular';

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080/auth', // Keycloak server URL
  realm: 'your-realm',               // Realm name
  clientId: 'my-angular-app',        // Client ID
};

export default keycloakConfig;
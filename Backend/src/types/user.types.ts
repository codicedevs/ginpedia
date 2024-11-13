export interface SSOData {
  data: {
    idToken: string | null;
    scopes: string[];
    serverAuthCode: string | null;
    user: {
      email: string;
      familyName: string;
      givenName: string;
      id: string;
      name: string;
      photo: string | null;
    };
  };
  type: string;
}
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { HttpService } from "./http.service";

interface LoginProps {
  access_token: string;
  refreshToken: string;
  user: any;
}

export class AuthService extends HttpService {
  constructor() {
    super("auth");
  }

  async login(email: string, password: string) {
    console.log(email);
    console.log(password);
    let loginProps: LoginProps | null = null;

    const res = await axios.post<LoginProps>(`${BASE_URL}/auth/signin`, {
      email: email,
      password: password,
    });
    this.saveAccessToken(res.data.access_token);
    this.saveRefreshToken(res.data.refreshToken);
    loginProps = res.data;

    return loginProps;
  }

  async signOut() {
    AsyncStorage.removeItem("access");
    AsyncStorage.removeItem("refresh");
  }

  async whoami() {
    return this.get("whoami");
  }
}

export default new AuthService();

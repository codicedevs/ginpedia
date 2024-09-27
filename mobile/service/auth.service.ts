import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { HttpService } from "./http.service";

interface LoginProps {
    accessToken: string;
    refreshToken: string;
    user: any;
}

class AuthService extends HttpService {
    constructor() {
        super("auth");
    }

    login = async (email: string, password: string) => {
        let loginProps: LoginProps | null = null;
        try {
            const res = await axios.post<LoginProps>(`${BASE_URL}/auth/signin`, { email, password });
            this.saveAccessToken(res.data.accessToken);
            this.saveRefreshToken(res.data.refreshToken);
            loginProps = res.data;
        } catch (err) {
            console.error(err);
        } finally {
            return loginProps;
        }
    };

    signOut = async () => {
        await AsyncStorage.removeItem('access');
        await AsyncStorage.removeItem('refresh');
    };

    whoami = async () => {
        return this.get("whoami");
    };

    recoverPassword = async (email: string) => {
        return this.post(`/recover-password`, { email: email })
    }
}

export default new AuthService();

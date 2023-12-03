import axios from "axios";
import Cookies from "js-cookie";

export const login = async (username, password) => {
    return axios.post(
        "http://localhost:8080/api/user/login", null, {
            params: {
                username: username,
                password: password
            }
        }
    );
};